type ProjectmodelType = {
   id: number
   title: string
   workflowType: string
   createdBy: string
   description: string
   createdAt: string
   projectType: string
   developers: any
}

class ProjectModel {
   id: number
   title: string
   workflowType: string
   createdBy: string
   description: string
   createdAt: string
   projectType: string
   developers: any

   constructor(props: any) {
      this.id = props.project_id
      this.title = props.name
      this.workflowType = props.workflow
      this.createdBy = props.created_by
      this.description = props.description
      this.createdAt = props.created_at
      this.projectType = props.project_type
      this.developers = props.developers
   }
}

export default ProjectModel
