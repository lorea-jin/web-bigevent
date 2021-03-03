$(function () {
  var layer = layui.layer;
  var form = layui.form;
  initArtCata();

  // 初始化富文本编辑器
  initEditor();

  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  //获取文章分类函数
  function initArtCata() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return;
        }
        var htmlStr = template("tpl-artcata", res);
        $("#form-pub [name=cate_id]").html(htmlStr);
        form.render();
      },
    });
  }

  // 选择封面文件
  $(".btn-choosepic").on("click", function () {
    $("#coverFile").click();
  });

  // 文件上传
  $("#coverFile").on("change", function (e) {
    var files = e.target.files;
    if (files.length === 0) {
      return;
    }

    var newImgURL = URL.createObjectURL(files[0]);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // 让默认值等于已发布，点击草稿改变值
  var art_state = "已发布";
  $("#btnDraft").on("click", function (e) {
    e.preventDefault();
    art_state = "草稿";
  });

  // 表单submit
  $("#form-pub").on("submit", function (e) {
    e.preventDefault();

    var fd = new FormData($(this)[0]);
    // fd.forEach(function (v, k) {
    //   // 第一个是值，第二个是键
    //   console.log(k, v);
    // });
    fd.append("state", art_state);
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append("cover_img", blob);
        launchArt(fd);
      });
    // console.log(fd);
  });

  // 发布文章功能
  function launchArt(fd) {
    $.ajax({
      url: "/my/article/add",
      method: "POST",
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("发布文章失败！");
        }
        layer.msg("发布文章成功！");
        location.href = "/art-list.html";
      },
    });
  }
});
