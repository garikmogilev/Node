exports.GetIndex = (request, response) => {
    response.redirect("/job/get")
        .catch(err => console.log(err))
}