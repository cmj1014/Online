<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-friend"></i>用户管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="success" icon="el-icon-goods" @click="showAdduser">添加用户</el-button>
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
          <el-option key="1" label="北京市" value="北京市"></el-option>
          <el-option key="2" label="天津市" value="天津市"></el-option>
          <el-option key="3" label="上海市" value="上海市"></el-option>
          <el-option key="4" label="重庆市" value="重庆市"></el-option>
          <el-option key="5" label="河北省" value="河北省"></el-option>
          <el-option key="6" label="山西省" value="山西省"></el-option>
          <el-option key="7" label="辽宁省" value="辽宁省"></el-option>
          <el-option key="8" label="吉林省" value="吉林省"></el-option>
          <el-option key="9" label="黑龙江省" value="黑龙江省"></el-option>
          <el-option key="10" label="浙江省" value="浙江省"></el-option>
          <el-option key="11" label="安徽省" value="安徽省"></el-option>
          <el-option key="12" label="福建省" value="福建省"></el-option>
          <el-option key="13" label="江西省" value="江西省"></el-option>
          <el-option key="14" label="山东省" value="山东省"></el-option>
          <el-option key="15" label="河南省" value="河南省"></el-option>
          <el-option key="16" label="湖北省" value="湖北省"></el-option>
          <el-option key="17" label="湖南省" value="湖南省"></el-option>
          <el-option key="18" label="广东省" value="广东省"></el-option>
          <el-option key="19" label="海南省" value="海南省"></el-option>
          <el-option key="20" label="四川省" value="四川省"></el-option>
          <el-option key="21" label="贵州省" value="贵州省"></el-option>
          <el-option key="22" label="云南省" value="云南省"></el-option>
          <el-option key="23" label="陕西省" value="陕西省"></el-option>
          <el-option key="24" label="甘肃省" value="甘肃省"></el-option>
          <el-option key="25" label="青海省" value="青海省"></el-option>
          <el-option key="26" label="台湾省" value="台湾省"></el-option>
          <el-option key="27" label="内蒙古自治区" value="内蒙古自治区"></el-option>
          <el-option key="28" label="广西壮族自治区" value="广西壮族自治区"></el-option>
          <el-option key="29" label="西藏自治区" value="西藏自治区"></el-option>
          <el-option key="30" label="宁夏回族自治区" value="宁夏回族自治区"></el-option>
          <el-option key="31" label="新疆维吾尔自治区" value="新疆维吾尔自治区"></el-option>
          <el-option key="32" label="香港特别行政区" value="香港特别行政区"></el-option>
          <el-option key="33" label="澳门特别行政区" value="澳门特别行政区"></el-option>
        </el-select>
        <el-input v-model="user_word" placeholder="搜索用户" class="handle-input mr10"></el-input>
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
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->

        <!-- <el-table-column prop="name" label="商品名" label-width="auto" align="center"></el-table-column> -->
        <!-- <el-table-column prop="normal_price" label="正常价格" width="80" align="center"></el-table-column> -->
        <!-- <el-table-column prop="promotion_price" label="促销价格" width="80" align="center"></el-table-column> -->
        <!-- <el-table-column prop="num" label="商品数量" width="80" align="center"></el-table-column> -->
        <!-- <el-table-column
          prop="promotion"
          label="促销标签"
          width="80"
          align="center"
          :formatter="formatter"
        ></el-table-column>-->
        <!-- <el-table-column prop="new" label="新品标签" width="80" align="center" :formatter="formatter"></el-table-column>
        <el-table-column prop="state" label="是否上架" width="80" align="center" :formatter="formatter"></el-table-column>
        <el-table-column label="操作" width="180" align="center">-->
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="昵称" width="80"></el-table-column>
        <el-table-column prop="tel" label="号码" width="110"></el-table-column>
        <el-table-column prop="date" label="日期" sortable width="100"></el-table-column>
        <el-table-column prop="lv" label="级别"></el-table-column>
        <el-table-column prop="pwd" label="密码"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="address" label="地址" width="130"></el-table-column>
        <el-table-column prop="headurl" label="头像" width="130"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
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

    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addVisible" width="56%" center>
      <div class="container" v-if="formStatus">
        <div class="form-box">
          <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="昵称" prop="name">
              <el-input v-model="form.name" autofocus="true"></el-input>
            </el-form-item>
            <el-form-item label="号码">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.date"
                value-format="yyyy-MM-dd"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="级别">
              <el-input v-model="form.lv"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.pwd"></el-input>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="6">
                <div class="grid-content bg-purple">头像</div>
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
            <el-form-item label="状态">
              <el-input v-model="form.state"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form'),addVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">保 存</el-button>
        <el-button type="primary" @click="resetForm('form')">重 置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData, daxunxun } from '../../api/index'
import {
  getUser,
  getUserTest,
  addUser,
  delUser,
  getUserAllNum,
  getSearch,
  gsearchNum
} from '../../action/User/index'
// import { Options } from '../../data/goods/index'
export default {
  data() {
    return {
      tableData: [], // 表单数据
      formStatus: true,
      // options: Options,
      // specification: '',
      showTag: false,
      user_word: '', // 搜索内容
      pageAllNum: 1000, //总页数
      pagesize: 10, // 单页显示条数
      pagebackground: true, // 分页背景色
      // showSpecification: false, //显示规格
      dialogImageUrl: '',
      dialogVisible: false,
      addVisible: false,
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
        id: '',
        name: '',
        tel: '',
        date: '',
        lv: '',
        pwd: '',
        age: '',
        address: '',
        headurl: '',
        state: ''
      },
      // 输入验证
      rules: {
        name: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        noNull: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
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
          // this.form.state = this.isTFAndNum(this.form.state)
          // this.form.promotion = this.isTFAndNum(this.form.promotion)
          // this.form.new = this.isTFAndNum(this.form.new)
          // console.log(this.form.tag)
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
          // let str = ''
          // this.form.tag.map(v => {
          //   str += v + ','
          // })
          // this.form.tag = str.substring(0, str.lastIndexOf(','))
          // console.log(str)
          // console.log(this.form)

          // 调用  添加商品方法
          addUser({
            name: this.form.name,
            tel: this.form.tel,
            lv: this.form.lv,
            pwd: this.form.pwd,
            age: this.form.age,
            address: this.form.address,
            state: this.form.state,
            image_url: this.form.image_url,
            // normal_price: this.form.normal_price,
            // promotion_price: this.form.promotion_price,
            more_txt: this.form.more_txt,
            more_url: this.form.more_url,
            // tag: this.form.tag,
            // num: this.form.num,
            // state: this.form.state,
            // promotion: this.form.promotion,
            // new: this.form.new,
            // specification: this.form.specification,
            shop_name: this.form.shop_name
          }).then(res => {
            console.log(res)
            this.$message(res.msg)
            // 重置
            this.resetForm('form')
            this.getData()
            this.addVisible = false
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
      console.log('刷新数据')
      // 分页用 统计数据数量
      getUserAllNum({}).then(res => {
        this.pageAllNum = res.count // 显示中数量
        console.log(this.pageAllNum)
      })
      getUser({
        name: this.form.name === '' ? undefined : this.form.name,
        tel: this.form.tel === '' ? undefined : this.form.tel,
        date: this.form.date === '' ? undefined : this.form.date,
        lv: this.form.lv === '' ? undefined : this.form.lv,
        pwd: this.form.pwd === '' ? undefined : this.form.pwd,
        age: this.form.age === '' ? undefined : this.form.age,
        address: this.form.address === '' ? undefined : this.form.address,
        headurl: this.form.headurl === '' ? undefined : this.form.headurl,

        state: 1,
        count: 20,
        start: (this.cur_page - 1) * 20
      }).then(res => {
        if (res.code === '1') {
          this.tableData = res.data //表单赋值
          console.log(this.tableData)
          //this.pageAllNum = Math.ceil(res.data.length / 20) //总页数
        }
        //console.log('res', res.code)
      })
    },
    // gettsgData() {
    //console.log(Options)
    // this.options = Options
    // },
    // 商品重置
    resetForm(formName) {
      //console.log(this.$refs.tagOp)
      //this.$refs.tagOp.$options.propsData.options = {}
      //this.options = {}
      //this.form.tag = ''
      // this.options = ''
      this.$refs[formName].resetFields()
      //console.log(this.$refs.tagOp.getCheckedNodes)
      //this.formStatus = false
      // this.form.num = 1
      // this.form.specification = ''
      // this.form.promotion = false
      // this.form.new = false

      setTimeout(() => {
        //this.formStatus = true
      }, 1)
    },

    // 搜索功能
    search() {
      //console.log(this.user_word)
      // 提交搜索内容
      getSearch({
        sear: this.user_word
      }).then(res => {
        //console.log(res)
        if (res.code === '1') {
          // 结果重新赋值到列表
          this.tableData = res.data
          //console.log(res.data)
        }
      })
      // 总条数
      gsearchNum({
        sear: this.user_word
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
    // 删除数据
    handleDelete(index, row) {
      console.log(index, row)
      // this.idx = index
      // this.id = row.id
      // this.delVisible = true
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
    showAdduser() {
      this.$message('添加商品')
      this.addVisible = 'true'
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
      delUser({
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
