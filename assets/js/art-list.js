$(function () {
  var layer = layui.layer;
  var form = layui.form;
  var laypage = layui.laypage;
  // 请求参数
  var q = {
    pagenum: 1, //当前页码值
    pagesize: 2, //每页显示多少条数据
    cate_id: "", //文章分类id
    state: "", //文章状态
  };
  //【提供的参数q 必须放到函数调用的前面，或者通过参数传递】
  initArtList(q);
  initCata();

  // 渲染文章列表函数
  function initArtList(param) {
    $.ajax({
      method: "get",
      url: "/my/article/list",
      data: param,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg("文章列表获取失败");
        }
        var htmlStr = template("tpl-artList", res);
        $("tbody").html(htmlStr);
        renderPage(res.total);
      },
    });
  }

  // 补零函数
  function padZero(n) {
    return (n = n < 10 ? "0" + n : n);
  }

  template.defaults.imports.dataFilter = function (date) {
    var dt = new Date(date);
    var y = dt.getFullYear();
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());
    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());

    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  };

  // 文章分类请求函数
  function initCata() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取分类数据失败！");
        }

        var htmlStr = template("tpl-artcata", res);
        // console.log(htmlStr);
        $("select[name=cate_id]").html(htmlStr);

        // 使用laiui的方法让表单重新渲染
        form.render();
      },
    });
  }

  $("#filterForm").on("submit", function (e) {
    e.preventDefault();
    q.cate_id = $("select[name=cate_id]").val();
    q.state = $("select[name=state]").val();
    initArtList(q);
  });

  // 渲染分页的方法
  function renderPage(total) {
    laypage.render({
      elem: "page", //注意，这里的盒子名称 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize, //每页显示的条数
      curr: q.pagenum,
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 3, 5, 8, 10],

      //触发jump的方式
      //(1)点击页码的时候
      //(2)只要调用了layer.render()方法的时候就会触发，此方法first值为true
      jump: function (obj, first) {
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数

        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        // initArtList(q); //写在这会发生死循环

        if (!first) {
          initArtList(q);
          //do something
        }
      },
    });
  }

  // 文章删除功能
  $("body").on("click", ".btn-del", function () {
    var id = $(this).attr("del-index");

    var delnum = $(".btn-del").length; //当前页面上删除的个数
    q.pagenum = delnum > 1 ? q.pagenum : q.pagenum - 1;
    // console.log(id);
    $.ajax({
      url: "/my/article/delete/" + id,
      method: "get",
      success: function (res) {
        initArtList(q);
      },
    });
  });
});
