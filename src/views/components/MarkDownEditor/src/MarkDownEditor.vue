<template>
  <a-card size="small" v-bind="$attrs">
    <template #[item]="data" v-for="item in Object.keys(omit($slots, editorSlots))" :key="item">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #extra>
      <a-space v-if="curMode === 'edit'">
        <slot name="action-of-edit"></slot>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleSave">确认</a-button>
      </a-space>
      <a-space v-else>
        <slot name="action-of-preview"></slot>
        <a-button type="primary" ghost @click="setMode('edit')">编辑</a-button>
      </a-space>
    </template>
    <mavon-editor
      :class="['editor', curMode]"
      @change="handleChange"
      v-bind="getEditorProps"
      v-model="content"
    >
      <template #[item]="data" v-for="item in Object.keys(pick($slots, editorSlots))" :key="item">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </mavon-editor>
  </a-card>
</template>

<script lang="ts" setup name="MarkDownEditor">
  import { ref, toRefs, computed } from 'vue';
  import { omit, pick } from 'lodash-es';

  type EditMode = 'edit' | 'preview';

  const props = defineProps({
    mode: {
      type: String as PropType<EditMode>,
      default: 'preview',
    },
    editorProps: Object,
    value: {
      type: String,
      default: '',
    },
  });

  const emit = defineEmits(['update:value', 'change', 'save', 'cancel']);

  const editorSlots = [
    'left-toolbar-before',
    'left-toolbar-after',
    'right-toolbar-before',
    'right-toolbar-after',
  ];

  const curMode = ref<EditMode>(props.mode);
  const content = ref(props.value);
  const { value: oriContent } = toRefs(props);

  const getEditorProps = computed(() => ({
    defaultOpen: curMode.value,
    editable: curMode.value === 'edit',
    subfield: curMode.value === 'edit',
    toolbarsFlag: curMode.value === 'edit',
    previewBackground: '#FFFFFF',
    boxShadow: false,
    toolbars: {
      bold: true, // 粗体
      italic: true, // 斜体
      strikethrough: true, // 中划线
      ol: true, // 有序列表
      ul: true, // 无序列表
      undo: true, // 上一步
      redo: true, // 下一步
      trash: true, // 清空
    },
    ...props.editorProps,
  }));

  const setMode = (mode: EditMode) => {
    curMode.value = mode;
  };

  const handleChange = (val) => {
    emit('change', val);
  };

  const handleCancel = () => {
    setMode('preview');
    emit('cancel', content.value, oriContent?.value);
    emit('update:value', oriContent?.value);
    content.value = oriContent?.value;
  };

  const handleSave = () => {
    setMode('preview');
    emit('update:value', content.value);
    emit('save', content.value);
  };
</script>

<style scoped lang="less">
  .editor {
    z-index: 0;
    border: none;
    min-height: 0;
    margin: -10px;
  }

  .editor.edit {
    min-height: 300px;
  }

  /deep/ .editor ul {
    list-style-type: disc;
  }

  /deep/ .editor ul ul,
  /deep/ .editor ol ul {
    list-style-type: circle;
  }

  /deep/ .editor ul ul ul,
  /deep/ .editor ul ol ul,
  /deep/ .editor ol ul ul,
  /deep/ .editor ol ol ul {
    list-style-type: circle;
  }
</style>
