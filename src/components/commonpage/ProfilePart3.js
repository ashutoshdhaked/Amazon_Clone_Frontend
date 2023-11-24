
const ProfilePart3 =(props)=>{
  const user = props.userdata;

    return(
        <div class="col-lg-12">
        <div class="card mb-2">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-4">
                <p class="mb-0">Full Name</p>
              </div>
              <div class="col-sm-8">
                <p class="text-muted mb-0">{user.name}</p>
              </div>
            </div>
            <hr></hr>
            <div class="row">
              <div class="col-sm-4">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-8">
                <p class="text-muted mb-0">{user.email}</p>
              </div>
            </div>
            <hr></hr>
            <div class="row">
              <div class="col-sm-4">
                <p class="mb-0">Username</p>
              </div>
              <div class="col-sm-8">
                <p class="text-muted mb-0">{user.username}</p>
              </div>
            </div>
            <hr></hr>
            <div class="row">
              <div class="col-sm-4">
                <p class="mb-0">Mobile</p>
              </div>
              <div class="col-sm-8">
                <p class="text-muted mb-0">{user.phone}</p>
              </div>
            </div>
            <hr></hr>
            <div class="row">
              <div class="col-sm-4">
                <p class="mb-0">About You </p>
              </div>
              <div class="col-sm-8">
                <p class="text-muted mb-0">{user.about}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ProfilePart3;