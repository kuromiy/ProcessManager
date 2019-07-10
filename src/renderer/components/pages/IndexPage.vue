<template>
  <div class="index-page">
    <ProjectModal
      v-if="projectModalFlag"
      @clickOutsideWindow="closeProjectModal"
      @clickCancel="closeProjectModal"
      @clickRegist="registProject">
    </ProjectModal>
    <SideBar></SideBar>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SideBar from "../organisms/SideBar.vue";
import ProjectModal from "../molecules/modal/ProjectModal.vue";
import { modalModule } from "../../store/modules/ModalModule";
import { Project } from "../../../database/models/Project";
import { projectModule } from "../../store/modules/ProjectModule";

@Component({
  name: "index-page",
  components: { SideBar, ProjectModal }
})
export default class IndexPage extends Vue {
  /**
   * プロジェクトモーダルの状態
   */
  public get projectModalFlag() {
    return modalModule.projectModal;
  }

  /**
   * プロジェクトモーダルを閉じる
   */
  public closeProjectModal() {
    modalModule.closeProjectModal();
  }

  /**
   * Projectをストアに登録する
   */
  public registProject(project: Project) {
    projectModule.addProject(project);
    modalModule.closeProjectModal();
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  display: grid;
  grid-template-columns: 100px 1fr;
  height: 100%;
}
</style>
