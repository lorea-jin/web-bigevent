$(function () {
  var layer = layui.layer;
  var form = layui.form;
  getArtCata();

  //添加分类按钮弹窗
  var indexAdd = null;
  $("#addcata").on("click", function () {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#tpl-addcata").html(),
    });
  });

  //确认添加按钮
  $("body").on("submit", "#formAddCata", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("分类添加失败");
        }
        layer.msg("分类添加成功");
        getArtCata();
        layer.close(indexAdd);
      },
    });
  });

  //编辑功能
  var indexEdit = null;
  $("tbody").on("click", "#btnEdit", function () {
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#tpl-addedit").html(),
    });
    var id = $(this).attr("data-index"); //this的data-index属性
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });

  //   编辑的确定按钮;
  $("body").on("submit", "#formEditCata", function (e) {
    //确认按钮不在表格中 不能委托给tbody 关联着也不算 弹出框是独立的
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res);
        getArtCata();
        layer.close(indexEdit);
      },
    });
  });

  // 删除按钮

  $("body").on("click", "#btnDelete", function () {
    var id = $(this).attr("del-index");
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      //do something
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg("删除失败");
          }
          layer.msg("删除成功");
          getArtCata();
        },
      });
      layer.close(index);
    });
  });
});

//渲染文章分类函数
function getArtCata() {
  $.ajax({
    method: "get",
    url: "/my/article/cates",
    success: function (res) {
      //   console.log(res);
      var htmlStr = template("tpl-catashow", res);
      $("tbody").html(htmlStr);
    },
  });
}
