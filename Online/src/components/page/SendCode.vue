<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-friend"></i>短信管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="el-icon-chat-dot-round" class="handle-del mr10" id="tset" @click="table = true">发送短信</el-button>
             
           
            </div>
           
        </div>

<el-drawer
  title="编辑短信"
  :visible.sync="table"
  direction="rtl"
  size="50%">
  <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
<el-form-item label="手机号">
       <el-input  clearable placeholder="请输入手机号，可输入多个，用逗号分割" v-model="inputNum"></el-input>
</el-form-item>
   
  <div style="margin: 30px 0;"></div>
  <el-form-item label="短信内容">
  <el-input
  type="textarea"
  :autosize="{ minRows: 4, maxRows: 4}"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>
</el-form-item>

<div style="margin: 20px 0;"></div>
<el-row :gutter="20">
  <el-col :span="4"><div class="grid-content"></div></el-col>
  <el-col :span="3"><div class="grid-content"></div></el-col>
  <el-col :span="10"><div class="grid-content">
       <el-button type="primary" size="medium" style="width: 100%"  round @click="sendCode">短信发送</el-button>
      </div></el-col>
  <el-col :span="3"><div class="grid-content"></div></el-col>
  <el-col :span="4"><div class="grid-content"></div></el-col>
</el-row>
  </el-form>
  </div>
</el-drawer>

    </div>
</template>

<script>
    import { fetchData,daxunxun} from '../../api/index';
    export default {
        name: 'basetable',
        data() {
            return {
                
                textarea:"",
                inputNum:"",
                table:false,
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1,
                id: -1
            }
        },
        created() {
            this.getData();
			
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
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
				}).then((res) => {
				    this.tableData = res.list;
					console.log(333,res)
				})
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
                    date: row.date,
                    address: row.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.id;
                this.delVisible = true;
            },
            sendCode() {//发送短信
               
               
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
    .bg-purple {
    background: #ffffff;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
