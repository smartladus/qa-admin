import type { App } from 'vue';
import { Button } from './Button';
import {
  Input,
  Layout,
  Card,
  Divider,
  Space,
  Switch,
  Select,
  Upload,
  Radio,
  Alert,
  Tabs,
  Tag,
  Row,
  Tooltip,
  Popover,
  Popconfirm,
  Cascader,
  TreeSelect,
  Spin,
  Col,
  Collapse,
  Empty,
  Typography,
  DatePicker,
} from 'ant-design-vue';
import MavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export function registerGlobComp(app: App) {
  app
    .use(Input)
    .use(Button)
    .use(Layout)
    .use(Card)
    .use(Divider)
    .use(Space)
    .use(Switch)
    .use(Select)
    .use(Upload)
    .use(Radio)
    .use(Alert)
    .use(Tabs)
    .use(Tag)
    .use(Row)
    .use(Popover)
    .use(Tooltip)
    .use(Popconfirm)
    .use(Cascader)
    .use(TreeSelect)
    .use(Spin)
    .use(Col)
    .use(MavonEditor)
    .use(Collapse)
    .use(Empty)
    .use(Typography)
    .use(DatePicker);
}
