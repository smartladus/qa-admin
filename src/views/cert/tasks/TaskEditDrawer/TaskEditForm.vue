<template>
  <BasicForm @register="register">
    <template #resetBefore>
      <a-space>
        <a-popover v-if="validErrors.length > 0" trigger="click">
          <a-button preIcon="ant-design:exclamation-circle" type="link" color="error">
            共 {{ validErrors.length }} 条错误内容
          </a-button>
          <template #title>
            <div style="font-weight: bolder">表单校验错误信息</div>
          </template>
          <template #content>
            <ul class="errList">
              <li
                v-for="err in validErrors"
                class="errListItem"
                @click="scrollToField(err.name[0])"
                :key="scrollToField(err.name[0])"
              >
                <Icon icon="ant-design:close-circle" class="errIcon" />
                {{ err.errors[0] }}
              </li>
            </ul>
          </template>
        </a-popover>
        <a-button @click="print">打印</a-button>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleSubmit">保存</a-button>
      </a-space>
    </template>
  </BasicForm>
</template>

<script setup lang="tsx" name="TaskEditForm">
  import {
    h,
    onMounted,
    watchEffect,
    inject,
    computed,
    ref,
    Ref,
    toRaw,
    getCurrentInstance,
  } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { MarkDownEditor } from '/@/views/components/MarkDownEditor';
  import { Icon } from '/@/components/Icon';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { storeToRefs } from 'pinia';
  import { useCertStore } from '/@/store/modules/cert';
  import { emptyTaskModel, TaskModel } from '/@/api/cert/model/taskModel';
  import { getCertTaskByTaskNo, updateCertTask, insertCertTask } from '/@/api/cert/task';
  import { CategoryModel } from '/@/api/cert/model/categoryModel';
  import { getCertCategoriesByRegion } from '/@/api/cert/category';
  import { InternalNamePath, ValidateErrorEntity } from 'ant-design-vue/es/form/interface';

  let { proxy } = getCurrentInstance();

  const taskNo: Ref<string | undefined> = inject('editingTaskNo') as Ref<string | undefined>;

  const { notification } = useMessage();
  const certNames = ref<Array<{ value: string; label: string }>>([]);
  let taskInfo: TaskModel; // 任务原始信息

  const loadTask = async () => {
    if (!taskNo.value) return;
    if (taskNo.value === 'new') {
      taskInfo = emptyTaskModel;
      await setFieldsValue(taskInfo);
    } else {
      taskInfo = await toRaw(getCertTaskByTaskNo(taskNo.value));
      await setFieldsValue({ ...taskInfo });
      await updateCertNames(taskInfo.region[1]);
    }
    await clearValidate();
  };

  onMounted(() => watchEffect(() => loadTask()));

  const updateCertNames = async (region) => {
    const categories: CategoryModel[] = await getCertCategoriesByRegion(region);
    if (
      categories.filter((category) => category.certName === getFieldsValue().certName).length <= 0
    ) {
      await setFieldsValue({ certName: undefined });
    }
    certNames.value = categories.map((category) => ({
      label: category.certName,
      value: category.certName,
    }));
  };

  const certStore = useCertStore();
  certStore.init();
  const { getRegionOptions, certMethodMap, taskStats } = storeToRefs(certStore);

  const schemas: FormSchema[] = [
    {
      field: 'taskNo',
      label: '任务编号',
      colProps: {
        span: 11,
      },
      component: 'Input',
      render: ({ model, field }) => {
        return (
          <a-tag color={model.task_no === 'new' ? 'success' : 'processing'}>{model[field]}</a-tag>
        );
      },
    },
    {
      field: 'taskStat',
      label: '任务状态',
      required: true,
      colProps: {
        span: 11,
      },
      component: 'Select',
      componentProps: {
        options: taskStats,
        disabled: computed(() => taskNo.value === 'new'),
      },
    },
    {
      field: 'todo',
      label: '待办事项',
      colProps: {
        span: 22,
      },
      component: 'Input',
      render: ({ model, field }) => {
        return h(MarkDownEditor, {
          value: model[field],
          placeholder: '输入待办事项',
        });
      },
    },
    {
      field: 'comments',
      label: '备注',
      colProps: {
        span: 22,
      },
      component: 'Input',
      render: ({ model, field }) => {
        return h(MarkDownEditor, {
          value: model[field],
          placeholder: '输入备注',
        });
      },
    },
    {
      field: 'divider',
      label: '',
      component: 'Divider',
    },
    {
      field: 'oaNo',
      label: '外部认证申请单号',
      colProps: {
        span: 11,
      },
      component: 'Input',
    },
    {
      field: 'cost',
      label: '费用',
      required: true,
      colProps: {
        span: 11,
      },
      component: 'InputNumber',
      componentProps: {
        min: 0,
        formatter: (value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        parser: (value) => value.replace(/￥\s?|(,*)/g, ''),
        onClick(e) {
          e.target.select();
        },
        style: 'width: 100%',
      },
    },
    {
      field: 'costBearer',
      label: '费用承担方',
      required: () => getFieldsValue().cost > 0,
      colProps: {
        span: 11,
      },
      component: 'Input',
    },
    {
      field: 'region',
      label: '认证区域',
      required: true,
      colProps: {
        span: 11,
      },
      component: 'Cascader',
      componentProps: {
        options: getRegionOptions,
        onChange: (val) => updateCertNames(val[1]),
      },
    },
    {
      field: 'certName',
      label: '认证名称',
      required: true,
      colProps: {
        span: 11,
      },
      component: 'Select',
      componentProps: {
        options: certNames,
      },
    },
    {
      field: 'certMethod',
      label: '获证方式',
      required: true,
      colProps: {
        span: 11,
      },
      component: 'Select',
      componentProps: {
        options: certMethodMap,
      },
    },
    {
      field: 'certMethodDesc',
      label: '获证方式说明',
      colProps: {
        span: 11,
      },
      component: 'InputTextArea',
    },
    {
      field: 'certOwner',
      label: '持证方',
      required: true,
      colProps: {
        span: 11,
      },
      component: 'Input',
    },
    {
      field: 'supName',
      label: '供应商',
      required: true,
      colProps: {
        span: 11,
      },
      component: 'Input',
    },
    {
      field: 'supModel',
      label: '供应商型号范围',
      required: true,
      colProps: {
        span: 22,
      },
      component: 'InputTextArea',
      componentProps: {
        autoSize: true,
      },
    },
    {
      field: 'jvModel',
      label: '数字科技型号范围',
      required: true,
      colProps: {
        span: 22,
      },
      component: 'InputTextArea',
      componentProps: {
        autoSize: true,
      },
    },
  ];

  const [register, { setFieldsValue, validate, clearValidate, getFieldsValue, scrollToField }] =
    useForm({
      labelWidth: 150,
      schemas,
      actionColOptions: {
        span: 24,
      },
      fieldMapToTime: [['fieldTime', ['startTime', 'endTime'], 'YYYY-MM']],
      // showAdvancedButton: true,
      // alwaysShowLines: 3,
      // autoAdvancedLine: 100,
      showResetButton: false,
      showSubmitButton: false,
    });

  const validErrors = ref<{ name: InternalNamePath; errors: string[] }[]>([]);
  const handleSubmit = async () => {
    try {
      await validate();
      validErrors.value = [];
      let pass;
      taskInfo = { ...taskInfo, ...getFieldsValue() };
      if (taskNo?.value === 'new') {
        pass = await insertCertTask(taskInfo);
        notification.success({
          message: '新建任务成功',
          description: `任务 ${pass.taskNo} 新建成功`,
        });
        taskNo.value = pass.taskNo;
      } else {
        pass = await updateCertTask(taskInfo);
        notification.success({
          message: '新建任务成功',
          description: `任务 ${pass.taskNo} 更新成功`,
        });
      }
      proxy.$bus.emit('TASK_UPDATE', taskInfo);
    } catch (e) {
      const err = e as ValidateErrorEntity;
      console.log(err);
      validErrors.value = err.errorFields;
    }
  };

  const handleCancel = () => {
    setFieldsValue(taskInfo);
  };

  const print = () => {
    // console.log('Fields: ', getFieldsValue());
    taskNo.value = 'xxx';
  };
</script>

<style scoped lang="less">
  .errIcon {
    color: @error-color;
    margin-right: 8px;
  }
  .errList {
    list-style: none;
    margin: -12px -16px -12px;
  }
  .errListItem {
    cursor: pointer;
    padding: 8px 16px;
    border-bottom: #d6d6d6 1px solid;
  }
  .errListItem:hover {
    background: #e6f7ff;
  }
</style>
