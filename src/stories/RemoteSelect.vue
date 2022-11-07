<template>
  <el-select
    v-model="value"
    :multiple="multiple"
    filterable
    clearable
    remote
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="handleChange"
  >
    <el-option
      v-for="item in list"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
    />
  </el-select>
</template>

<script>
let templateList = [];
import axios from "axios";
export default {
  name: "remote-select",
  props: {
    requestUrl: {
      type: String,
      required: true,
    },
    requestType: {
      type: String,
      required: true,
      default: "GET",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: { type: Boolean, default: false },
    labelKey: {
      type: String,
      default: "label",
    },
    valueKey: {
      type: String,
      default: "value",
    },
    setSelectValue: { type: Function },
  },
  data() {
    return {
      value: "",
      list: [],
      loading: false,
    };
  },
  created() {},
  methods: {
    async remoteMethod(key) {
      if (key) {
        this.loading = true;
        try {
          let res = null;
          if (this.requestType === "GET") {
            res = await axios({
              method: "GET",
              url: this.requestUrl,
              params: {
                key,
              },
            });
          } else if (this.requestType === "POST") {
            res = await axios({
              method: "POST",
              url: this.requestUrl + "?key=" + key,
              data: {
                key,
              },
            });
          }
          this.loading = false;
        } catch {
          this.loading = false;
        }
      }
    },

    handleChange(val) {
      if (val) {
        if (!this.multiple) {
          const label = this.list.filter((item) => item[this.valueKey] === val);
          const reqVal = [label[0][this.labelKey], val];
          this.$emit("setSelectValue", reqVal);
        } else {
          const selectList = templateList.concat(this.list);
          templateList = selectList;
          const label = val.map((item) => {
            return selectList.filter(
              (item2) => item2[this.valueKey] === item
            )[0][this.labelKey];
          });
          this.$emit("setSelectValue", [label, val]);
        }
      } else {
        this.$emit("setSelectValue", [null, null]);
      }
    },

    setValue(val) {
      this.value = val;
    },

    clearTemplateList() {
      templateList = [];
    },
  },
};
</script>
