<template>
  <div>
    <HomePageHeader>
    </HomePageHeader>
    <HomePageContent
      :projects="projects"
      @deleteProject="deleteProject">
    </HomePageContent>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomePageHeader from "../molecules/homepage/HomePageHeader.vue";
import HomePageContent from "../molecules/homepage/HomePageContent.vue";
import { projectModule } from "../../store/modules/ProjectModule";
import { Project } from "../../../database/models/Project";
import { processModule } from "../../store/modules/ProcessModule";

@Component({
  name: "home-page",
  components: { HomePageHeader, HomePageContent }
})
export default class HomePage extends Vue {
  public get projects() {
    return projectModule.projects;
  }

  public deleteProject(project: Project) {
    console.log(project);
    // プロジェクトに属しているプロセスを全削除した後にプロジェクトを削除する
    processModule.deleteProcessByProject(project);
    projectModule.deleteProject(project);
  }
}
</script>
