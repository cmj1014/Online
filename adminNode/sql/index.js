//封装数据库增删改查
const sql = {
	//增加数据
	/* insert: function(Collection, insertData, callback) {
		Collection.insertMany(insertData, (err) => {
			if (err) throw err;
			callback();
		})

	} */
	insert: function(Collection, insertData) {
		return new Promise(function(resolve, reject) {
			Collection.insertMany(insertData, (err, data) => {
				if (err) throw err;
				resolve(data);
			})
		})


	},
	//查询数据
		find(Collection, whereObj, count, start,  rank) {
		return new Promise(function(resolve, reject) {
			// debugger
			Collection.find(whereObj).limit(count).skip(start).sort( rank).exec((err, data) => {
				//console.log("find:"+data);
				if (err) throw err;
				resolve(data);
			})
		})
	},
	//排序
	sort(Collection, whereObj, showObj, sortObj) {
		return new Promise(function(res, rej) {
			Collection.find(whereObj, showObj).sort(sortObj).exec((err, data) => {
				if (err) throw err;
				res(data);
			})
		})
	},
	//统计数量
	count(Collection, whereObj, showObj) {
		return new Promise(function(res, rej) {
			Collection.find(whereObj, showObj).count().exec((err, data) => {
				if (err) throw err;
				res(data);
			})
		})
	},

	update(Collection, whereObj, updateObj, updateType) {
		updateType = updateType || 'updateOne';
		return new Promise(function(res, rej) {

			Collection[updateType](whereObj, updateObj, (err, data) => {
				if (err) throw err;
				res(data);
			})
		})
	},
	//去重分类
	distinct(Collection, distinctObj) {
		return new Promise(function(resolve, reject) {
			Collection.distinct(distinctObj).exec((err, data) => {
				//console.log("find:"+data);
				if (err) throw err;
				resolve(data);
			})
		})
	},
	delete(Collection, whereObj, deleteType) {
	//多用户删除请使用 deleteType="deleteMany"
		return new Promise((res, rej) => {
			deleteType = deleteType || "deleteOne";
			Collection[deleteType](whereObj, (err) => {
				console.log(whereObj);
				if (err) throw err;
				console.log('delete success');
				res();
			})
		})
	}
}
module.exports = sql;
