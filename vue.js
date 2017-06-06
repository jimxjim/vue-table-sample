const app = new Vue({
  el: '#app',
  // template: '',
  data() {
    return {
      name: 'jimxjim',
      searchName: '',
      userData: null,
      nowPage: 1,
      countDownNum: 5,
      tableData: [],
      theadName: ['Name','Email','Phone','Grade'],
    }
  },
  computed: {
    filteredData: function () {
      var searchName = this.searchName && this.searchName.toLowerCase()
      var data = this.tableData
      if (searchName) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(searchName) > -1
          })
        })
      }
      return data.slice((this.nowPage - 1) * 5,this.nowPage * 5)
    },
  },
  methods: {
    toFirstPage() {
      this.nowPage = 1;
    },
    showInfo(data) {
      if (!data) { return ''; }
      var request = [];
      for (const key in data) {
        if (data[key] !== '' && typeof data[key] !== 'undefined') { request.push(`${key}: ${data[key]}`); }
      }
      var info = request.reduce((pre, cur) => `${pre}\n${cur}`);
      alert(info);
    },
    selectPage(page) {
      this.nowPage = page;
    },
    countDown() {
      if (this.tableData.length === 0 && this.countDownNum > 0) {
        this.countDownNum -= 1;
      }
    },
    ajaxData() {
      that = this;
      axios.get(`https://gist.githubusercontent.com/jimxjim/39e14f5b58ab3451b8cc69fbf96a5d65/raw/b47d4cfa9d757552b91ae4c81ee7da17d7c9c806/test%2520data`).then(function (response) {
        console.log(response.data)
        that.tableData = response.data;
      });
    },
  },
  created() {
    var that = this;
    setInterval(function() { that.countDown(); }, 1000);
    setTimeout(function() {
      that.ajaxData();
    }, 5000);
  }
});
