<template>
  <BasicModal
    v-bind="$attrs"
    :title="title"
    :okButtonProps="okButtonProps"
    @ok="handleUpload"
    @visible-change="onVisibleChange"
  >
    <a-upload-dragger
      name="file"
      :fileList="fileList"
      :before-upload="beforeUpload"
      :multiple="false"
      @change="onFileSelected"
    >
      <p class="ant-upload-drag-icon">
        <Icon icon="ant-design:inbox-outlined" :size="64" />
      </p>
      <p class="ant-upload-text">将文件拖动到此区域或点击以上传文件</p>
      <p class="ant-upload-hint">仅支持单文件上传</p>
    </a-upload-dragger>
    <a-divider />
    <a-space direction="vertical" style="width: 100%">
      <a-row justify="space-between">
        <div>
          <span>选择上传方式：</span>
          <a-radio-group v-model:value="mode" button-style="solid">
            <a-radio-button value="add">增量上传</a-radio-button>
            <a-radio-button value="replace">覆盖替换</a-radio-button>
          </a-radio-group>
        </div>
        <a-button type="link" preIcon="ant-design:download" @click="downloadTemplate">
          下载模板
        </a-button>
      </a-row>
      <a-alert
        :message="mode === 'add' ? messageOfAdd : messageOfReplace"
        :type="mode === 'add' ? 'info' : 'warning'"
        show-icon
      />
    </a-space>
  </BasicModal>
</template>

<script setup lang="ts" name="UploadModal">
  import { defineExpose, defineProps, toRefs, ref, unref, toRaw, defineEmits, computed } from 'vue';
  import { Icon } from '/@/components/Icon';
  import { BasicModal } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { downloadByUrl } from '/@/utils/file/download';
  import { UploadChangeParam } from 'ant-design-vue';
  import { UploadApi } from '/@/views/components/UploadModal';

  const {
    createMessage: { warning },
    notification,
  } = useMessage();

  const props = defineProps({
    title: {
      type: String,
      default: '上传清单',
    },
    messageOfAdd: {
      type: String,
      default: '已选择增量上传，仅增加id不同的行。',
    },
    messageOfReplace: {
      type: String,
      default: '已选择覆盖替换，请谨慎操作！',
    },
    templateDownloadUrl: {
      type: String,
      required: false,
    },
    uploadApi: Function as PropType<UploadApi>,
    onUploadProgress: Function as PropType<(progressEvent: ProgressEvent) => void>,
  });

  defineExpose({ ...toRefs(props) });

  const emit = defineEmits(['unloadSucceed']);

  const fileList = ref<Array<any>>([]);

  // 屏蔽自动上传，手动操作
  const beforeUpload = () => false;

  // 只支持单文件上传，有新文件被选中时，仅保留最新的一个
  const onFileSelected = (uploadChangeParam: UploadChangeParam) => {
    fileList.value = [...uploadChangeParam.fileList]
      .map((fileRef) => toRaw(unref(fileRef)))
      .slice(-1);
  };

  const okButtonProps = computed(() => {
    return {
      disabled: fileList.value.length <= 0,
      loading: okBtnLoading.value,
    };
  });

  const mode = ref('add');

  const okBtnLoading = ref(false);
  const handleUpload = async () => {
    let { uploadApi, onUploadProgress } = props;
    okBtnLoading.value = true;
    // 未设置UploadApi则发出提示并停止OK按钮的loading
    if (!uploadApi) {
      warning('文件上传Api未设置，请联系管理员');
      okBtnLoading.value = false;
      return;
    }

    try {
      const res = await uploadApi(
        toRaw(unref(fileList)),
        false,
        mode.value,
        onUploadProgress
          ? onUploadProgress
          : (e) =>
              console.log(`onUploadProgress is not set, this is default function, event: ${e}`),
      );
      console.log(res);
      notification.success({
        message: '文件上传成功',
        description:
          mode.value === 'add'
            ? `已完成上传，共增加${res.length}条记录`
            : `已完成替换，共上传${res.length}条记录`,
      });
      emit('unloadSucceed');
      // 上传完成重置对话框
      resetModal();
    } catch (e) {
      const err = e as Error;
      notification.error({
        message: '文件上传失败',
        description: err.message,
      });
    } finally {
      okBtnLoading.value = false;
    }
  };

  const resetModal = () => {
    mode.value = 'add';
    fileList.value = [];
  };

  // 关闭对话框时重置对话框
  const onVisibleChange = (visible) => {
    if (!visible) resetModal();
  };

  // 模板下载
  const downloadTemplate = () => {
    let { templateDownloadUrl } = props;
    if (templateDownloadUrl === undefined) {
      warning('下载链接未设置，请联系管理员');
    } else {
      downloadByUrl({
        url: templateDownloadUrl,
        target: '_self',
      });
      notification.success({
        message: '下载成功',
        description: '请查看下载记录！',
      });
    }
  };
</script>

<style scoped></style>
