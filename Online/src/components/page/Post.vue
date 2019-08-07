<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-friend"></i>公告管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="发布者" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>发布者: {{ scope.row.name }}</p>
              <p>内容:{{ scope.row.conent }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="内容" width="280">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px" >{{ scope.row.content }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加弹出窗 -->
    <el-dialog title="添加" :visible.sync="addVisible" width="50%">
      <el-form ref="form" :model="form" label-width="50px">
        <el-form-item label="日期">
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间"
            ></el-date-picker>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addText">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData, daxunxun } from "../../api/index";
export default {
  name: "basetable",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          content:
            "分享下面这篇文章的测试，我发现的另一个结论，如果对一个没有子元素的元素同时绑定冒泡和捕获"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          content:
            "分享下面这篇文章的测试，我发现的另一个结论，如果对一个没有子元素的元素同时绑定冒泡和捕获"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          content:
            "分享下面这篇文章的测试，我发现的另一个结论，如果对一个没有子元素的元素同时绑定冒泡和捕获"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          content:
            "分享下面这篇文章的测试，我发现的另一个结论，如果对一个没有子元素的元素同时绑定冒泡和捕获"
        }
      ],
      pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
            picker.$emit('pick', new Date());
            }
          }
        ]
      },
      value1: '',
      
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: "",
      textarea: "",
      is_search: false,
      editVisible: false,
      delVisible: false,
      addVisible: false,
      form: {
        name: "",
        date: "",
        content: "12312"
      },
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    // fetch("http://10.11.555.1111")
    //   .then(res => res.json())
    //   .then(data => {
    //     this.testData = data.data;
    //   });

  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      });
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      /* fetchData({
                    page: this.cur_page
                }).then((res) => {
                    this.tableData = res.list;
                }) */
      daxunxun({
        page: this.cur_page
      }).then(res => {
        this.tableData = res.list;
        console.log(333, res);
      });
    },
    // 添加到后台
    addText () {
      let arrs = 'user.name' + '=' + form.name  + '&' + "content" + '=' +  form.content
      fetch('"https://www.ddddd.com/add/" +  arrs ').then(res => res.json()).then(data => {
        this.addVisible = false;
        console.log(data)
      })
    },
    search() {
      this.is_search = true;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      this.idx = index;
      this.id = row.id;
      this.form = {
        id: row.id,
        name: row.name,
        content: row.content
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.id = row.id;
      this.delVisible = true;
    },
    handleAdd(index, row) {
      this.idx = index;
      this.id = row.id;
      this.form = {
        id: row.id,
        name: row.name,
        content: row.content
      };
      this.addVisible = true;
    },
    
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      if (this.tableData[this.idx].id === this.id) {
        this.$set(this.tableData, this.idx, this.form);
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id === this.id) {
            this.$set(this.tableData, i, this.form);
            return;
          }
        }
      }
    },
    // 确定删除
    deleteRow() {
      this.$message.success("删除成功");
      this.delVisible = false;
      if (this.tableData[this.idx].id === this.id) {
        this.tableData.splice(this.idx, 1);
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id === this.id) {
            this.tableData.splice(i, 1);
            return;
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.list {
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #aa4e4e;
  display: flex;
  justify-content: space-between;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
</style>
