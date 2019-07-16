module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: DataType.STRING,
        password: DataTypes.STRING
    });
    return User;
}