import RemoteSelect from "./RemoteSelect.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vue from "vue";
Vue.use(ElementUI);

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Example/RemoteSelect",
  component: RemoteSelect,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    requestUrl: { description: "请求url（入参为key）" },
    requestType: { description: "请求类型，只支持GET和POST且必须大写" },
    multiple: { description: "是否多选" },
    disabled: { description: "是否禁用" },
    labelKey: { description: "下拉框选项名称的key" },
    valueKey: { description: "下拉框选项值的key" },
    setSelectValue: {
      description:
        "获取下拉框值回调；如果是单选（multiple：false），返回的数组[label,value]第一个值为选项名称，第二个为选项值；如果是多选（multiple：true），第一个值为选项名称数组，第二个为选项值数组",
    },
    setValue: {
      description: "通过$ref给select设置初始值：setValue(value)",
    },
    clearTemplateList: {
      description: "在多选时通过$ref清空临时数据：clearTemplateList()",
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RemoteSelect },
  template: '<remote-select v-bind="$props" />',
});
export const Single = Template.bind({});
Single.args = {
  requestUrl: "",
  requestType: "GET",
  multiple: false,
  disabled: false,
  labelKey: "label",
  valueKey: "value",
};

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
};
