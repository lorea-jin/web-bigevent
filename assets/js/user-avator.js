$(function () {
  var layer = layui.layer;
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  $("#btnFiles").on("click", function (e) {
    $("#fileAdd").click();
  });

  //为file表单绑定change事件。选择的文件发生变化就能监听到
  $("#fileAdd").on("change", function (e) {
    var filseChoosed = e.target.files;
    if (filseChoosed.length <= 0) {
      return layer.msg("还没选择文件");
    }

    //更换选择的文件至剪裁框
    var newImgURL = URL.createObjectURL(filseChoosed[0]);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  $("#btn-sure").on("click", function () {
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    //发起ajax请求
    $.ajax({
      method: "POST",
      url: "/my/update/avatar",
      data: { avatar: dataURL },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新头像失败");
        }
        //同步父级的获取用户信息函数
        layer.msg("更换头像成功");
        window.parent.getUserInfo();

        $("#image").attr("src", dataURL);
      },
    });
  });
});
