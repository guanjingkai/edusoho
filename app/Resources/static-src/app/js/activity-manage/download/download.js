import FileChooser from '../../file-chooser/file-choose';
import notify from 'common/notify';
import {
  chooserUiOpen
} from '../widget/chooser-ui.js';

export default class DownLoad {
  constructor() {
    this.$form = $('#step2-form');
    this.validator2 = null;
    this.firstName = $('#title').val();
    this.media = {};
    this.materials = {};
    this.initStep2Form();
    this.bindEvent();
    this.initFileChooser();
  }
  initStep2Form() {
    let validator2 = this.$form.validate({
      rules: {
        title: {
          required: true,
          maxlength: 50,
          trim: true,
          course_title: true,
        },
        link: 'url',
        materials: 'required',
      },
      messages: {
        link: Translator.trans("activity.download_manage.link_error_hint"),
        materials: Translator.trans('activity.download_manage.materials_error_hint')
      }
    });
  }

  bindEvent() {
    this.$form.on('click', '.js-btn-delete', (event) => this.deleteItem(event));
    this.$form.on('click', '.js-video-import', () => this.importLink());
    this.$form.on('click', '.js-add-file-list', () => this.addFile());
    this.$form.on('blur', '#title', (event) => this.changeTitle(event));
  }

  deleteItem(event) {
    let $parent = $(event.currentTarget).closest('li');
    let mediaId = $parent.data('id');
    if (this.materials && this.materials[mediaId]) {
      delete this.materials[mediaId];
      $("#materials").val(JSON.stringify(this.materials));
    }
    if ($parent.siblings('li').length <= 0) {
      $("#materials").val('');
    }
    $parent.remove();
  }

  importLink() {
    console.log('导入');
    if (this.$form.data('validator').valid() && $("#link").val().length > 0) {
      console.log('可以导入');
      $("#verifyLink").val($("#link").val());
      $('.js-current-file').text($("#verifyLink").val());
    }
  }

  initFileChooser() {
    const fileSelect = file => {
      // 赋值给media上传的文件信息
      $('#media').val(JSON.stringify(file));
      chooserUiOpen();
      // 获得数据对象
      this.loadFile();
      // 重置上传文件导致标题名称的改变
      $('#title').val(this.firstName);
      $('.js-current-file').text(file.name);
    }

    const fileChooser = new FileChooser();

    fileChooser.on('select', fileSelect);
  }

  changeTitle(event) {
    let $this = $(event.currentTarget);
    this.firstName = $this.val();
  }

  isEmpty(obj) {
    return obj == null || obj == "" || obj == undefined || Object.keys(obj).length == 0;
  }

  addLink() {
    // 链接的时候，通过js手动把链接的信息设置成数组的形式
    let data = {
      source: 'link',
      id: $("#verifyLink").val(),
      name: $("#verifyLink").val(),
      link: $("#verifyLink").val(),
      summary: $("#file-summary").val(),
      size: 0
    }

    $("#media").val(JSON.stringify(data));
    this.media = JSON.parse($('#media').val());
  }


  loadFile() {
    this.media = this.isEmpty($("#media").val()) ? {} : JSON.parse($("#media").val());
    this.materials = this.isEmpty($("#materials").val()) ? {} : JSON.parse($("#materials").val());
  }


  addFile() {
    console.log($("#link").val());
    if (this.$form.data('validator').valid() && $("#link").val().length > 0) {
      console.log('添加链接');
      // 链接存在而且格式验证通过
      this.addLink();
    }


    // 失败提示：请上传或选择资料
    if (this.isEmpty(this.media)) {
      console.log('数据为空');
      this.addFailTip();
      return;
    }

    this.media.summary = $("#file-summary").val();
    this.materials[this.media.id] = this.media;
    $("#materials").val(JSON.stringify(this.materials));


    // 获得第一次上传文件的title值赋值给标题名称
    if (!this.firstName) {
      this.firstName = this.media.name;
      $('#title').val(this.firstName);
    }

    this.addSuccessTip();

    this.showFile();

    if ($('.jq-validate-error:visible').length > 0) {
      // 点击 添加资料，并没有提交表单，url验证失败，返回false;
      this.$form.data('validator').form();
    }
  }


  //显示上传的文件或者链接名
  showFile() {

    let item_tpl = '';

    if (this.media.link) {
      item_tpl = `
        <li class="download-item " data-id="${ this.media.link }">
          <a class="gray-primary" href="${ this.media.link}" target="_blank">${ this.media.name}<span class="glyphicon glyphicon-new-window text-muted text-sm mlm" title="${ Translator.trans('activity.download_manage.materials_delete_btn')}"></span></a>
          <a class="gray-primary phm btn-delete js-btn-delete" href="javascript:;"  data-url="" data-toggle="tooltip" data-placement="top" title="${Translator.trans('activity.download_manage.materials_delete_btn')}"><i class="es-icon es-icon-delete"></i></a>
        </li>
      `;
    } else {
      item_tpl = `
        <li class="download-item " data-id="${ this.media.id }">
          <a class="gray-primary" href="/materiallib/${ this.media.id }/download">${ this.media.name }</a>
          <a class="gray-primary phm btn-delete js-btn-delete" href="javascript:;"  data-url="" data-toggle="tooltip" data-placement="top" title="${Translator.trans('activity.download_manage.materials_delete_btn')}"><i class="es-icon es-icon-delete"></i></a>
        </li>
      `;
    }

    $("#material-list").append(item_tpl);
    $('[data-toggle="tooltip"]').tooltip();

    this.media = {};
    $('#media').val('');
    $('#link').val('');
    $("#file-summary").val('');

  }

  addFailTip() {
    $('.js-success-redmine').hide();
    $('.js-current-file').text('');
    $('.js-danger-redmine').text(Translator.trans('activity.download_manage.materials_error_hint')).show();
    setTimeout(function() {
      $('.js-danger-redmine').slideUp();
    }, 3000);
  }

  addSuccessTip() {
    $('.js-danger-redmine').hide();
    $('.js-current-file').text('');
    $('.js-success-redmine').text(Translator.trans('activity.download_manage.materials_add_success_hint')).show();
    setTimeout(function() {
      $('.js-success-redmine').slideUp();
    }, 3000);
  }

}