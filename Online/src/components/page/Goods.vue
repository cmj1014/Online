<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-goodsfill"></i>商品管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="success" icon="el-icon-goods" @click="addgoods">添加商品</el-button>
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>-->
        <el-input v-model="goods_word" placeholder="搜索商品" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <el-table
        :data="data"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="date" label="日期" sortable width="150"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="pageAllNum"
        ></el-pagination>
      </div>
    </div>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加商品" :visible.sync="centerDialogVisible" width="56%" center>
      <div class="container" v-if="formStatus">
        <div class="form-box">
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="form.name" autofocus="true"></el-input>
            </el-form-item>

            <el-row :gutter="30">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="商品数量">
                    <el-input-number v-model="form.num" :min="1" :max="999999999" label="商品数量"></el-input-number>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="正常价格" prop="normal_price">
                    <el-input-number
                      v-model="form.normal_price"
                      type="number"
                      :min="0"
                      :max="999999999"
                    ></el-input-number>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-form-item label="促销价格" prop="promotion_price">
                    <el-input-number
                      v-model="form.promotion_price"
                      type="number"
                      :min="0"
                      :max="999999999"
                    ></el-input-number>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="5">
                <el-form-item label="新品">
                  <el-switch v-model="form.new"></el-switch>
                </el-form-item>
              </el-col>

              <el-col :span="5">
                <el-form-item label="促销">
                  <el-switch v-model="form.promotion"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="分类" ref="tag">
              <el-cascader
                @focus="gettsgData"
                :options="options"
                v-model="form.tag"
                :show-all-levels="false"
                clearable
                ref="tagOp"
              ></el-cascader>
            </el-form-item>

            <el-form-item label="商品规格" ref="specification">
              <el-input
                v-model="form.specification"
                placeholder="输入自定义规格,有多个规格请用逗号隔开，如：XL，XXL，L，M，S"
                prop="specification"
              ></el-input>

              <!-- <el-button type="primary" icon="el-icon-plus" circle @click="showSpecification=true"></el-button> -->
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content bg-purple">商品图片</div>
              </el-col>
              <el-col :span="6" :offset="6">
                <div class="grid-content bg-purple"></div>
              </el-col>
            </el-row>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form'),centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">保 存</el-button>
        <el-button type="primary" @click="resetForm('form')">重 置</el-button>
      </span>
    </el-dialog>
    <!-- 添加商品规格 -->
    <!-- <el-dialog title="添加商品规格" :visible.sync="showSpecification" width="30%" center>
     
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSpecification = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->
    <!-- 添加分类 -->
    <el-dialog title="分类" :visible.sync="showTag" width="30%" center>
      <span>输入自定义规格，如：XL</span>
      <div>
        <el-input v-model="form.tag" placeholder="请输入分类规格"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showTag = false">取 消</el-button>
        <el-button type="primary" @click="showTag = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData, daxunxun } from '../../api/index'
import { getGoods, getGoodsTest } from '../../action/Goods/index'
import { Options } from '../../data/goods/index'
export default {
  data() {
    return {
      formStatus: true,
      options: Options,
      specification: '',
      showTag: false,
      goods_word: '', // 搜索内容
      pageAllNum: 1000, //中页数
      showSpecification: false, //显示规格
      dialogImageUrl: '',
      dialogVisible: false,
      centerDialogVisible: false,
      tableData: [],
      cur_page: 1,
      multipleSelection: [],
      select_cate: '',
      select_word: '',
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      //提交表单属性
      form: {
        specification: '', // 商品规格
        name: '',
        num: 1,
        normal_price: 0,
        promotion_price: 0,
        promotion: false,
        new: false,
        tag: ''
      },
      // 输入验证
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 35, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  created() {
    this.getData()
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true
            break
          }
        }
        if (!is_del) {
          if (
            d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d
          }
        }
      })
    }
  },
  // 注册组件
  components: {},
  methods: {
    onSubmit() {
      console.log('添加商品成功')
    },
    // 分页导航
    handleCurrentChange(val) {
      //alert(val)
      this.cur_page = val
      this.getData()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // fetchData({
      //   page: this.cur_page
      // }).then(res => {
      //   console.log('fetchData', res)
      //   this.tableData = res.list
      // })
      // daxunxun({
      //   page: this.cur_page
      // }).then(res => {
      //   this.tableData = res.list
      //   console.log(333, res)
      // })
      console.log('getData')
      getGoods()
      // getGoods({
      //   //name: this.form.name
      // }).then(res => {
      //   console.log('res', res)
      // })
    },
    gettsgData() {
      console.log(Options)
      this.options = Options
    },
    // 商品重置
    resetForm(formName) {
      console.log(this.$refs.tagOp)
      //this.$refs.tagOp.$options.propsData.options = {}
      //this.options = {}
      //this.form.tag = ''
      this.options = ''
      this.$refs[formName].resetFields()
      //console.log(this.$refs.tagOp.getCheckedNodes)
      //this.formStatus = false
      this.form.num = 1
      this.form.specification = ''
      this.form.promotion = false
      this.form.new = false

      setTimeout(() => {
        //this.formStatus = true
      }, 1)
    },

    // 添加规格
    addSpecification() {},
    search() {
      this.is_search = true
    },
    formatter(row, column) {
      return row.address
    },
    // filterTag(value, row) {
    //   return row.tag === value
    // },
    handleEdit(index, row) {
      this.idx = index
      this.id = row.id
      this.form = {
        id: row.id,
        name: row.name,
        date: row.date,
        address: row.address
      }
      this.editVisible = true
    },
    handleDelete(index, row) {
      this.idx = index
      this.id = row.id
      this.delVisible = true
    },
    delAll() {
      const length = this.multipleSelection.length
      let str = ''
      this.del_list = this.del_list.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error('删除了' + str)
      this.multipleSelection = []
    },
    // 添加商品
    addgoods() {
      this.$message('添加商品')
      this.centerDialogVisible = 'true'
    },
    test() {
      alert('1323131test')
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false
      this.$message.success(`修改第 ${this.idx + 1} 行成功`)
      if (this.tableData[this.idx].id === this.id) {
        this.$set(this.tableData, this.idx, this.form)
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id === this.id) {
            this.$set(this.tableData, i, this.form)
            return
          }
        }
      }
    },
    // 确定删除
    deleteRow() {
      this.$message.success('删除成功')
      this.delVisible = false
      if (this.tableData[this.idx].id === this.id) {
        this.tableData.splice(this.idx, 1)
      } else {
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].id === this.id) {
            this.tableData.splice(i, 1)
            return
          }
        }
      }
    }
  }
}
</script>

<style scoped>
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
