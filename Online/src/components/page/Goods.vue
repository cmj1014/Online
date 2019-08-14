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
        <el-button type="success" icon="el-icon-goods" @click="showAddgoods">添加商品</el-button>
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <!-- <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>-->
        <el-input v-model="goods_word" placeholder="搜索商品" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>
      <el-table
        stripe
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="商品名" label-width="auto" align="center"></el-table-column>
        <el-table-column prop="normal_price" label="正常价格" width="80" align="center"></el-table-column>
        <el-table-column prop="promotion_price" label="促销价格" width="80" align="center"></el-table-column>
        <el-table-column prop="num" label="商品数量" width="80" align="center"></el-table-column>

        <el-table-column
          prop="promotion"
          label="促销标签"
          width="80"
          align="center"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column prop="new" label="新品标签" width="80" align="center" :formatter="formatter"></el-table-column>
        <el-table-column prop="state" label="是否上架" width="80" align="center" :formatter="formatter"></el-table-column>

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
          :page-size="pagesize"
          :background="pagebackground"
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

              <el-col :span="5">
                <el-form-item label="是否上架">
                  <el-switch v-model="form.state"></el-switch>
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item
              label="分类"
              ref="tag"
              prop="tag"
              :rules="{required: true, message: '不能为空', trigger: 'change'}"
            >
              <el-cascader
                @focus="gettsgData"
                :options="options"
                v-model="form.tag"
                :show-all-levels="false"
                clearable
                ref="tagOp"
              ></el-cascader>
            </el-form-item>

            <el-form-item
              label="商品规格"
              ref="specification"
              prop="specification"
              :rules="{
      required: true, message: '不能为空', trigger: 'blur'
    }"
            >
              <el-input
                v-model="form.specification"
                placeholder="输入自定义规格,有多个规格请用逗号隔开，如：XL，XXL，L，M，S"
                prop="form.specification"
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
import {
  getGoods,
  getGoodsTest,
  addGoods,
  delGoods,
  getPageAllNum,
  getSearch,
  gsearchNum
} from '../../action/Goods/index'
import { Options } from '../../data/goods/index'
export default {
  data() {
    return {
      tableData: [], // 表单数据
      formStatus: true,
      options: Options,
      specification: '',
      showTag: false,
      goods_word: '', // 搜索内容
      pageAllNum: 1000, //总页数
      pagesize: 20, // 单页显示条数
      pagebackground: true, // 分页背景色
      showSpecification: false, //显示规格
      dialogImageUrl: '',
      dialogVisible: false,
      centerDialogVisible: false,
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
        tag: '',
        image_url: '', //图片,
        more_txt: '',
        more_url: '',
        state: 0,
        shop_name: '官方出品'
      },
      // 输入验证
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 35, message: '长度在 3 到 35 个字符', trigger: 'blur' }
        ],
        noNull: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          {
            min: 1,
            max: 35,
            message: '长度在 1 到 35 个字符',
            trigger: 'blur'
          }
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
    // 状态转数字
    isTFAndNum(objstr) {
      console.log(objstr)
      if (objstr === true) {
        objstr = 1
      } else if (objstr === false) {
        objstr = 0
      } else if (objstr === -1) {
        objstr = -1
      }
      return objstr
    },
    // 添加商品提交
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('添加商品成功')

          this.form.state = this.isTFAndNum(this.form.state)
          this.form.promotion = this.isTFAndNum(this.form.promotion)
          this.form.new = this.isTFAndNum(this.form.new)
          console.log(this.form.tag)
          // 应对端口参数不能为空
          for (const key in this.form) {
            let val = this.form[key]
            if (val === '' || val === undefined) {
              this.form[key] = 'false'
            } else {
              //this.form[key] = val + ''
            }
          }
          // 分割分类数组
          let str = ''
          this.form.tag.map(v => {
            str += v + ','
          })
          this.form.tag = str.substring(0, str.lastIndexOf(','))
          console.log(str)
          console.log(this.form)

          // 调用  添加商品方法
          addGoods({
            name: this.form.name,
            image_url: this.form.image_url,
            normal_price: this.form.normal_price,
            promotion_price: this.form.promotion_price,
            more_txt: this.form.more_txt,
            more_url: this.form.more_url,
            tag: this.form.tag,
            num: this.form.num,
            state: this.form.state,
            promotion: this.form.promotion,
            new: this.form.new,
            specification: this.form.specification,
            shop_name: this.form.shop_name
          }).then(res => {
            console.log(res)
            this.$message(res.msg)
            // 重置
            this.resetForm('form')
            this.getData()
            this.centerDialogVisible = false
          })
        } else {
          this.$message('添加失败')
        }
      })
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

    // 格式化促销和新品
    formatter(row, column) {
      //console.log(row.new)
      if (row.new === 1 || row.promotion === 1 || row.state === 1) {
        return '是'
      } else {
        return '否'
      }
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // axios
      //   .post('/api/user/register', {
      //     user_name: 'test',
      //     user_tel: 18939920579,
      //     user_pwd: '123123',
      //     user_age: 78,
      //     user_add: 'zhengge',
      //     user_headurl: '12312312'
      //   })
      //   .then(res => {
      //     console.log('add user')
      //     console.log(res)
      //   })
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
      //console.log('getData')
      //getGoods()
      console.log('刷新数据')
      // 分页用 统计数据数量
      getPageAllNum({}).then(res => {
        this.pageAllNum = res.count // 显示中数量
        console.log(this.pageAllNum)
      })
      getGoods({
        name: this.form.name === '' ? undefined : this.form.name,
        state: 1,
        //name:"jee",
        count: 20,
        start: (this.cur_page - 1) * 20
      }).then(res => {
        if (res.code === '1') {
          this.tableData = res.data //表单赋值
          //this.pageAllNum = Math.ceil(res.data.length / 20) //总页数
        }
        //console.log('res', res.code)
      })
    },
    gettsgData() {
      //console.log(Options)
      this.options = Options
    },
    // 商品重置
    resetForm(formName) {
      //console.log(this.$refs.tagOp)
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

    // 搜索功能
    search() {
      //console.log(this.goods_word)
      // 提交搜索内容
      getSearch({
        sear: this.goods_word
      }).then(res => {
        //console.log(res)
        if (res.code === '1') {
          // 结果重新赋值到列表
          this.tableData = res.data
          //console.log(res.data)
        }
      })
      //console.log('gsearchNum')
      // 总条数
      gsearchNum({
        sear: this.goods_word
      }).then(res => {
        //console.log('res', res)
        // 结果重新赋值到列表
        this.pageAllNum = res.count
        //console.log(res.data)
      })
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
    // 显示添加商品窗口
    showAddgoods() {
      this.$message('添加商品')
      this.centerDialogVisible = 'true'
      resetForm('form')
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
      delGoods({
        id: this.id
      }).then(res => {
        if (res.code === '1') {
          tab: res.data
          this.$message.success(res.msg)
          this.delVisible = false
        } else {
          this.$message.success(res.msg)
        }
      })

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
