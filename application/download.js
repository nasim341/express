exports.downloads = async(req, res) => {
    res.download("./uploads/abc.jpg")
}