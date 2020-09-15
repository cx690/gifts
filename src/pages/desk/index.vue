<template>
  <div class="main">
    <header class="header">
      <div class="item">
        检索：
        <a-input-search
          v-model="form.kw"
          placeholder="请输入关键字"
          style="width: 200px"
          @search="onSearch"
        />
      </div>
      <div class="item">
        创建时间：
        <a-range-picker
          v-model="form.time"
          valueFormat="YYYY-MM-DD HH:mm"
          :showTime="{
					format:'HH:mm'
				}"
          format="YYYY-MM-DD HH:mm"
        />
      </div>
      <div class="item">
        <a-button type="primary" @click="onSearch">搜索</a-button>
        <a-button type="primary" @click="onRest">重置</a-button>
        <a-button type="primary" @click="add">新增</a-button>
      </div>
    </header>
    <div class="total">
      <span>合计金额：￥</span>
      <span style="color: red;font-size: 16px;">{{total}}</span>
      <span style="margin-left:20px">共计：</span>
      <span>{{data.length}} 条数据</span>
    </div>
    <div class="content">
      <a-spin :spinning="loading" size="large">
        <a-table :data-source="data" :pagination="pagination" rowKey="id" bordered>
          <a-table-column key="name" title="姓名" data-index="name" />
          <a-table-column key="price" title="金额" data-index="price" />
          <a-table-column key="desc" title="备注" data-index="desc" />
          <a-table-column key="createdAt" title="创建时间" data-index="createdAt" width="200px">
            <template slot-scope="text">
              <span>{{$moment(text).format('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </a-table-column>
          <a-table-column key="updatedAt" title="修改时间" data-index="updatedAt" width="200px">
            <template slot-scope="text">
              <span>{{$moment(text).format('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </a-table-column>
          <a-table-column key="action" title="操作" data-index="action" width="300px">
            <template slot-scope="text,row">
              <a-popconfirm title="确定要删除数据吗？" @confirm="deleteItem(row.id)">
                <a-button type="danger">删除</a-button>
              </a-popconfirm>&nbsp;&nbsp;
              <a-button type="primary" @click="add(row)">修改</a-button>
            </template>
          </a-table-column>
        </a-table>
      </a-spin>
    </div>
    <a-modal
      :title="current?'修改数据':'新增数据'"
      :visible="visible"
      @ok="save"
      @cancel="visible = false"
      :confirm-loading="confirmLoading"
    >
      <a-form-model
        ref="ruleForm"
        :model="addForm"
        :rules="rules"
        :labelCol="{span:4}"
        :wrapperCol="{span:16}"
      >
        <a-form-model-item prop="name" label="名称">
          <a-input v-model="addForm.name" placeholder="请输姓名" class="input" />
        </a-form-model-item>
        <a-form-model-item prop="price" label="金额">
          <a-input
            type="number"
            v-model="addForm.price"
            placeholder="请输金额"
            class="input"
            @blur="onBlur"
          />
        </a-form-model-item>
        <a-form-model-item prop="desc" label="备注">
          <a-textarea
            :maxLength="200"
            v-model="addForm.desc"
            style="resize:none;width:400px;height:100px"
            placeholder="备注"
            class="input"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { addCommas } from "@/utils/tool.js";
import { saveData, getData, getOne, deleteOne } from "@/api/desk.js";
export default {
  name: "demo",
  data() {
    return {
      form: {
        kw: "",
        time: [],
      },
      data: [],
      pagination: {
        pageSize: 10,
      },
      total: 0,
      addForm: {
        price: 0,
        desc: "",
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入名字!",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入金额!",
            trigger: "blur",
          },
        ],
      },
      visible: false,
      confirmLoading: false,
      current: null,
      loading: false,
    };
  },
  mounted() {
    this.onSearch();
  },
  methods: {
    async onSearch() {
      this.loading = true;
      const { code, data, message, total = 0 } = await getData(this.form);
      this.loading = false;
      if (code === 200) {
        this.data = data;
      } else if (message) {
        this.$message.error(message);
      }
      this.total = total;
    },
    deleteItem(id) {
      deleteOne({
        id,
      }).then((res) => {
        const { code } = res;
        if (code === 200) {
          this.$message.success("操作成功！");
        } else {
          this.$message.error("操作失败！");
        }
        this.onSearch();
      });
    },
    save() {
      this.$refs.ruleForm
        .validate()
        .then(() => {
          saveData(this.addForm).then((res) => {
            const { code } = res;
            if (code === 200) {
              this.$message.success("操作成功！");
              this.visible = false;
            } else {
              this.$message.error("操作失败！");
            }
            this.onSearch();
          });
        })
        .catch((e) => {});
    },
    add(current = null) {
      this.current = current;
      this.visible = true;
      if (current) {
        const { price, desc, name, id } = current;
        this.addForm = {
          price,
          desc,
          name,
          id,
        };
      } else {
        this.addForm = {
          price: 0,
          desc: "",
          name: "",
        };
      }
    },
    onBlur() {
      this.addForm.price = Number(this.addForm.price);
    },
    onRest() {
      this.form.kw = "";
      this.form.time = [];
      this.onSearch();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 10px;

  .header {
    line-height: 60px;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;

    .item {
      display: inline-block;
      margin-left: 10px;

      button {
        margin-left: 10px;
      }
    }
  }

  .total {
    line-height: 30px;
    text-indent: 10px;
  }

  .content {
    width: 100%;
    height: auto;
  }
}
</style>
