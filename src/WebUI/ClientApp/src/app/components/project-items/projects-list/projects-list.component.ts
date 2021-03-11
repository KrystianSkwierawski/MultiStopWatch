import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ProjectsDataService } from '../../../services/projects-data-service';
import { CreateProjectItemCommand, FavoriteProjectItemsClient, LikeOrDislikeProjectItemCommand, ProjectItemDto, ProjectItemsClient, UpdateProjectItemCommand, PaginatedListOfProjectItemDto } from '../../../web-api-client';
import { SearchItemByTitleComponent } from '../../utilities/search-item-by-title/search-item-by-title.component';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { EditProjectDialogComponent } from '../edit-project-dialog/edit-project-dialog.component';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  @ViewChild(SearchItemByTitleComponent) searchProjectComponent: SearchItemByTitleComponent;

  paginatedListOfProjectItemDto: PaginatedListOfProjectItemDto;
  projects: ProjectItemDto[];
  titlesArray: string[];

  constructor(public dialog: MatDialog,
    private projectItemsClient: ProjectItemsClient,
    private favoriteProjectItemsClient: FavoriteProjectItemsClient,
    private projectsDataService: ProjectsDataService) { }

  ngOnInit() {
    this.projectsDataService.paginatedListOfProjectItemDto.subscribe(result => {
      this.paginatedListOfProjectItemDto = result;
      this.projects = result.items;    
      this.filterTitlesArray();
    });
  }

  openDialogToCreateNewProject() {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addProject(result);
      }
    });
  }

  addProject(projectItem: ProjectItemDto) {
    if (this.searchProjectComponent) {
      this.searchProjectComponent.cleanInput();
    }

    this.projectItemsClient.create(CreateProjectItemCommand.fromJS(projectItem)).subscribe(() => {
      this.projectsDataService.loadProjects();
    });
  }

  openDialogToEditProject(projectItem: ProjectItemDto) {

    const dialogRef = this.dialog.open(EditProjectDialogComponent, {
      data: projectItem
    });

    dialogRef.afterClosed().subscribe((result: ProjectItemDto) => {
      if (result) {
        result.id = projectItem.id;
        this.updateProject(result);
      }
    });
  }

  updateProject(projectItem: ProjectItemDto) {
    this.projectItemsClient.update(UpdateProjectItemCommand.fromJS(projectItem)).subscribe(() => {
      this.projectsDataService.loadData();
    });
  }

  deleteProject(id) {
    this.projectItemsClient.delete(id).subscribe(() => {
      this.projectsDataService.loadData();
    });
  }

  hoveredDivId: number = null;

  setHoveredDivId(index: number = null) {
    this.hoveredDivId = index;
  }

  filterTitlesArray() {
    if (this.paginatedListOfProjectItemDto.items) {
      this.titlesArray = this.paginatedListOfProjectItemDto.items.map((e) => { return e.title });
    }
  }

  filterProjects(searchingTitle: string) {
    const filteredProjects: ProjectItemDto[] = this.paginatedListOfProjectItemDto.items.filter(x => x.title.includes(searchingTitle));
    this.projects = filteredProjects;
  }

  handleLikeOrDislikeProjectButton(projectId: number) {
    this.favoriteProjectItemsClient.likeOrDislike(<LikeOrDislikeProjectItemCommand>{ id: projectId }).subscribe(() => {
      this.projectsDataService.loadData();
    });
  }

  updatePagination(event: PageEvent) {
    this.projectsDataService.loadProjects(event.pageIndex + 1, event.pageSize);
  }
}
