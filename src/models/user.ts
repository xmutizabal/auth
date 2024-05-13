import { Schema, model, models } from "mongoose";

const userSchema = new Schema ({
    email: {
        type: String,
        unique: true,
        required: [true, "El email es requerido"],
        match:[
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            "Email no valido"
        ]
    },
    password: {
        type: String,
        required: [true, "El Password es requerido"],
        select: false
    },
    fullname: {
        type: String,
        required: [true, "El nombre es requerido"],
        minLength:[3,"El nombre debe tener al menos 3 caracteres"],
        maxLength:[50, "El nombre debe ser de máximo 50 caracteres"]
    }
})

const User = models.User || model('User', userSchema)
export default User