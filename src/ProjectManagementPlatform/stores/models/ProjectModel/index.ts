type ProjectmodelType = {
   id: number
   name: string
   workflow_type: string
   created_by: string
   description: string
   created_at: string
   project_type: string
   developers: any
}

class ProjectModel {
   id: number
   name: string
   workflow_type: string
   created_by: string
   description: string
   created_at: string
   project_type: string
   developers: any

   constructor(props: any) {
      this.id = props.id
      this.name = props.name
      this.workflow_type = props.workflow_type
      this.created_by = props.created_by
      this.description = props.description
      this.created_at = props.created_at
      this.project_type = props.project_type
      this.developers = props.developers
   }
}

export default ProjectModel
