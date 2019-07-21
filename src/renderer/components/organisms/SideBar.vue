<template>
  <div class="side-bar">
    <!-- ホームアイコン -->
    <BaseIcon
      @click="clickHomePage">
      Home
    </BaseIcon>
    <!-- 登録されているプロジェクトアイコン一覧 -->
    <ProjectList
      :projects="projects"
      @clickProjectIcon="clickProjectIcon"
      @clickAddProject="clickAddProjectIcon">
    </ProjectList>
    <!-- 設定アイコン -->
    <BaseIcon
      @click="clickSettingPage">
      Setting
    </BaseIcon>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseIcon from "../atoms/BaseIcon.vue";
import ProjectList from "../molecules/ProjectList.vue";
import { Project } from "../../../database/models/Project";
import { projectModule } from "../../store/modules/ProjectModule";
import { modalModule } from "../../store/modules/ModalModule";

@Component({
  name: "side-bar",
  components: { BaseIcon, ProjectList }
})
export default class SideBar extends Vue {
  /**
   * ストアのProject一覧を返す。
   */
  public get projects() {
    return projectModule.projects;
  }

  /**
   * ホーム画面へ遷移
   */
  public clickHomePage() {
    this.$router.push({path: "/"});
  }

  /**
   * クリックしたプロジェクトアイコンのプロジェクト画面へ遷移
   */
  public clickProjectIcon(project: Project) {
    this.$router.push({name: "project-page", params: {projectId: String(project._id)}});
  }

  /**
   * プロジェクト追加モーダル表示
   */
  public clickAddProjectIcon() {
    modalModule.openProjectModal();
  }

  /**
   * 設定画面へ遷移
   */
  public clickSettingPage() {
    this.$router.push({path: "/setting"});
  }
}
</script>

<style lang="scss" scoped>
.side-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid #313131;

  overflow: hidden;
}
</style>
