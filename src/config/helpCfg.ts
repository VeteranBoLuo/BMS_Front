import tagAndBookmark from '@/assets/img/help/tag_bookmark_relation.jpg';
import tagMg from '@/assets/img/help/tag_mg.jpg';
import tagAddBtn from '@/assets/img/help/tag_addBtn.jpg';
import tagAddPage from '@/assets/img/help/tag_addPage.jpg';
import tagTable from '@/assets/img/help/tag_table.jpg';
import tagTree from '@/assets/img/help/tag_tree.jpg';
import bookmarkMg from '@/assets/img/help/bookmark_mg.jpg';
import bookmarkAddPage from '@/assets/img/help/bookmark_addPage.jpg';
import bookmarkTable from '@/assets/img/help/bookmark_table.jpg';
import bookmarkMainPage from '@/assets/img/help/bookmark_mainPage.jpg';
import opinionMg from '@/assets/img/help/opinionMg.png';
import { ref } from 'vue';
import UpdateLogs from '@/components/personCenter/UpdateLogs.vue';

export const listOptions = ref([
  {
    id: '书签与标签',
    title: '书签与标签',
    content: `<div class="tag-explanation" >
      <h2>理解标签与书签</h2>

        <div class="bookmark-definition">
        <h3>什么是标签？</h3>
       <p>标签是用于描述内容、分类或属性的关键词，它帮助我们组织和分类信息。在本网站中，标签用于对书签进行分类，使得查找和浏览更加高效。</p>
      </div>
      <div class="bookmark-definition">
        <h3>什么是书签？</h3>
        <p>书签是保存网站链接以便快速访问的一种方式。你可以将喜欢的网页或资源添加到书签中，以便日后快速检索。</p>
      </div>

      <h3>标签与书签的关系</h3>
      <p>一个标签下可以有多个书签。例如，"文档"标签可能包含各种文档网站的书签，菜鸟教程、Vue官方网站等。</p>
      <p>同样，一个书签也可以属于多个标签。例如，Vue的官方网站可能同时属于"Vue"和"文档"这两个标签，因为它既与Vue相关，又是一个文档网站。</p>

      <div class="bookmark-example">
        <h3>关系示例</h3>
        <img src="${tagAndBookmark}"  alt="书签示例" class="bookmark-image"   />
        <p style="font-size: 12px">
        <i>书签标签关系图</i>
    </p>
      </div>
    </div>`,
  },
  {
    id: '标签管理',
    title: '标签管理',
    content: `<div style="width: 100%;margin: auto">
      <div class="bookmark-example">
        <p style="font-size: 12px">
        <p style="text-align: left">1、点击标签管理进入标签管理页面</p>
        <img src="${tagMg}"  alt="标签示例" class="bookmark-image" width="80%"  style="border: 1px solid;"/>
         <p style="text-align: left">2、点击新增进入添加标签页面</p>
        <img src="${tagAddBtn}"  alt="标签示例" class="bookmark-image"   width="80%" style="border: 1px solid;"/>
         <p style="text-align: left">3、标签图标可通过本地上传或粘贴图标的svg代码、base64代码等两种方式设置</p>
        <img src="${tagAddPage}"  alt="标签示例" class="bookmark-image"   width="80%" style="border: 1px solid;"/>
         <p style="text-align: left">4、新增成功后可在标签管理页面和首页查看</p>
        <img src="${tagTable}"  alt="标签示例" class="bookmark-image"   width="80%" style="border: 1px solid;"/>
         <img src="${tagTree}"  alt="标签示例" class="bookmark-image"   width="80%" style="border: 1px solid;"/>
          <p style="text-align: left;font-size: 12px">注：标签列表可通过拖拽排序</p>
    </p>
        <i style="text-align: center;font-size: 12px">标签管理示例</i>
      </div>
    </div>`,
  },
  {
    id: '书签管理',
    title: '书签管理',
    content: `<div class="tag-explanation" style="margin: auto">
         <div class="bookmark-example">
        <p style="font-size: 12px">
         <p style="text-align: left">1、点击书签管理进入书签管理页面，或者直接右键标签快速创建与此标签相关的书签</p>
        <img src="${bookmarkMg}"  alt="书签示例" class="bookmark-image"   width="80%" style="border: 1px solid;"/>
          <p style="text-align: left">2、书签无需上传图标，系统会自动根据网站地址生成</p>
        <img src="${bookmarkAddPage}"  alt="书签示例" class="bookmark-image"   width="80%" style="border: 1px solid;"/>
          <p style="text-align: left">3、新增成功后可在书签管理页面和首页查看</p>
        <img src="${bookmarkTable}"  alt="书签示例" class="bookmark-image"   width="80%" style="border: 1px solid;"/>
        <img src="${bookmarkMainPage}"  alt="书签示例" class="bookmark-image"   width="80%" style="border: 1px solid;"/>
    </p>
        <i style="font-size: 12px">书签管理示例</i>
    </div>`,
  },
  {
    id: '意见反馈',
    title: '意见反馈',
    content: `<div class="tag-explanation" >
       <div class="bookmark-example">
        <img style="width: 80%" src="${opinionMg}" alt="标签管理示例" class="bookmark-image">
        <p style="font-size: 12px">
        <i>意见反馈页面</i>
    </p>
      </div>
    <div style="margin: 0 auto;width: 80%"><div>模块宗旨</div><p style="font-size: 14px">意见反馈模块旨在搭建一个用户与项目开发人员之间沟通的桥梁，便于您及时向我反映在使用过程中遇到的问题、提出的建议以及期望的功能，帮助我不断优化产品，为您提供更优质的服务。</p>
  <br/>
  <div>模块功能</div>
  <p style="font-size: 14px">问题反馈：您可以在此提交在使用项目过程中遇到的问题，如功能异常、操作不便等，我将尽快为您解决。<br/>
  建议征集：欢迎您提出宝贵建议，包括功能优化、界面美化、操作简化等方面，我会认真倾听并积极采纳。<br/>
  点赞与鼓励：如果您对我的项目表示满意，也可以在此给予我肯定和鼓励，激励我继续努力。<br/>
  实时跟进：提交反馈后，您可以实时查看反馈处理进度，了解解决结果。</p>

  <br/>

  <div>使用指南</div>
  <p style="font-size: 14px">进入意见反馈模块：项目右上角头像下拉框中找到“意见反馈”入口，点击进入。
  填写反馈内容：根据提示，详细描述您遇到的问题或建议，以便我更快地为您解决问题。<br/>
  提交反馈：确认无误后，点击“提交”按钮，您的反馈将实时发送至项目团队。<br/>
  查看反馈进度：在“我的反馈”页面，您可以查看已提交反馈的处理进度及回复。</>

  <br/>

  <div>温馨提示</div>
  <p style="font-size: 14px">请确保反馈内容真实、客观、具体，以便我更好地为您解决问题。
  为保护您的隐私，请勿在反馈内容中透露个人信息。
  我会尽快处理您的反馈，请您耐心等待。</p>
  <br/>
  <b style="font-size: 20px">感谢您对项目的支持与关注，您的意见是我不断进步的动力！</b></div>
    </div>`,
  },
]);
