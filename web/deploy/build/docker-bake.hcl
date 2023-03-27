target "default" {
  context    = "../.."
  dockerfile = "./deploy/build/dockerfile"
  platforms  = [
    "linux/amd64",
    #		"linux/arm64"
  ]
  tags = [
    "elyspio/elytools-api:latest"
  ]
  args = {
    SLN_PATH         = "back/Elytools.Api.sln"
    MAIN_CSPROJ_PATH = "Web/Elytools.Api.Web.csproj"
    ROOT_FOLDER      = "back/"
    ENTRY_DLL        = "Elytools.Api.Web.dll"
  }
}