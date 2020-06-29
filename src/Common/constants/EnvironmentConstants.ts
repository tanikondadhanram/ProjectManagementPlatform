interface ConfigType{
    BASE_URL:string
}

const envVariables = process.env

const Config:any = {}

Object.keys(envVariables).forEach((variable) => {
    if(variable.includes("REACT_APP")){
        const envKey = variable.replace("REACT_APP","")
        Config[envKey] = envVariables[envKey]
    }
})

export default Config