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
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>
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
    },
    disabled: { type: Boolean, default: false },
    multiple: {
      type: Boolean,
      default: false,
    },
    setSelectValue: Function,
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
              url: this.requestUrl,
              data: {
                key,
              },
            });
          }
          this.list = res.data.data;
          this.loading = false;
        } catch {
          this.loading = false;
        }
      }
    },

    handleChange(val) {
      if (val) {
        if (!this.multiple) {
          const label = this.list.filter((item) => item.value === val);
          const reqVal = [label[0].label, val];
          this.$emit("setSelectValue", reqVal);
        } else {
          this.$emit("setSelectValue", val);
        }
      } else {
        this.$emit("setSelectValue", [null, null]);
      }
    },

    setValue(val) {
      this.value = val;
    },
  },
};
</script>
