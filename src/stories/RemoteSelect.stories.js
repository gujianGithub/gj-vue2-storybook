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
    multiple: { description: "是否多选" },
    requestUrl: { description: "请求url（入参为key）" },
    requestType: { description: "请求类型，只支持GET和POST且必须大写" },
    disabled: { description: "是否禁用" },
    setSelectValue: { description: "获取下拉框值回调" },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { RemoteSelect },
  template: '<remote-select v-bind="$props" />',
});

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
};

export const Single = Template.bind({});
Single.args = {
  multiple: false,
};
