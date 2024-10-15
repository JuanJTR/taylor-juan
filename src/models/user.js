import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now
    }
});

// Método pre-save para hashear la contraseña antes de guardarla
// UserSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();

//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// // Método para comparar contraseñas
// UserSchema.methods.comparePassword = async function (candidatePassword) {
//     return bcrypt.compare(candidatePassword, this.password);
// };

// const User = mongoose.model('User', UserSchema);

// module.exports = User;

// Crear el modelo
const coleccionName = 'UserN'
const collection = mongoose.models.UserN || mongoose.model(coleccionName, UserSchema); //envia la data a la "coleccion" o tabla
export default collection //condicional para evitar conflicto al recargar y no intente crear un nuevo modelo existente