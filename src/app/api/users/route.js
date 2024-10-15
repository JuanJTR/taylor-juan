// import { connectDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import connectDB from '@/lib/mongodb';
import { ObjectId } from 'mongodb';


// VER TODOS LOS USUARIOS 
export async function GET(req) {
    try {
        await connectDB()

        const users = await User.find()
        console.log(users)
        return NextResponse.json(users)

        // return new Response('Conexión exitosa');
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return new Response('Error al conectar con la base de datos', { status: 500 });
    }
}

// CREAR USUARIO
export async function POST(req) {
    try {
        await connectDB()
        const data = await req.json()

        // Expresión regular para validar el formato del email
        // ^[\w-\.]+ <- permite NOMBRE con letras, números, guiones bajos, guiones y puntos.
        // ([\w-]+\.)+ <- permite DOMINIO con letras, números y guiones.
        // [\w-]{2,4}$ <- permite EXTENSION DE DOMINIO, entre 2 y 4 caracteres.
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[a-z]{2,}$/;

        if (!emailRegex.test(data.email)) {
            console.log('Formato de Correo electronico invalido o incompleto');
            return new Response('Formato de correo electrónico no válido', { status: 400 });
        }

        // Controla o verifica que el correo no exista o no este guardado en la BD
        //el email, es dato unico de cada usuario
        const existEmail = await User.findOne({ email: data.email });
        if (existEmail) {
            console.log('NO se pudo crear el usuario')
            return new Response('correo electronico en uso e invalido, ingrese otro correo electronico,', { status: 400 })
        }

        const user = await User.create(data)
        return NextResponse.json({ message: 'Usuario creado y guardado', user }, { status: 201 });

    } catch (error) {
        console.log('ERROR AL CREAR USUARIO')
        return new Response('Error al crear usuario en la BD', { status: 500 })
    }
}

// ELIMINAR USUARIO
// export async function DELETE(req) {
//     try {
//         await connectDB()

//         // Extraer el ID desde la query string
//         const { searchParams } = new URL(req.url);
//         const id = searchParams.get('id')
//         console.log("el ID: " + id)

//         if (!id) {
//             console.log("NO se pudo ELIMIAR usuario")
//             return new Response('No se pudo eliminar usuario', { status: 400 })
//         }

//         // Validar que el ID tiene el formato correcto de ObjectId (24 caracteres hexadecimales)
//         if (id.length !== 24 || !/^[a-fA-F0-9]{24}$/.test(id)) {
//             console.log("ID no válido");
//             return new Response('ID no válido: debe ser un ObjectId de 24 caracteres hexadecimales', { status: 400 });
//         }

//         // Convertir el ID en un ObjectId de MongoDB
//         let objectId;
//         try {
//             objectId = new ObjectId(id); // Esto convierte el ID en formato de MongoDB
//         } catch (error) {
//             console.error('Error al convertir el ID a ObjectId:', error);
//             return new Response('ID no válido', { status: 400 });
//         }

//         const user = await User.findById(objectId);
//         if (!user) {
//             console.log("Usuario NO encontrado");
//             return new Response('Usuario NO encontrado', { status: 404 });
//         }

//         await User.deleteOne({ _id: objectId });
//         return NextResponse.json({ message: 'Usuario ELIMINADO correctamente' }, { status: 204 });

//     } catch (error) {
//         console.log('Error al eliminar usuario:', error);
//         return new Response('Error al eliminar el usuario', { status: 500 });
//     }
// }

// http://localhost:3000/api/users?id=USER_ID
// ELIMINAR USUARIO
export async function DELETE(req) {
    try {
        await connectDB();

        // Extraer el ID desde la query string
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        console.log("El ID: " + id);

        if (!id) {
            console.log("ID no proporcionado");
            return new Response('No se pudo eliminar el usuario: ID no proporcionado', { status: 400 });
        }

        // Validar que el ID tiene el formato correcto de ObjectId (24 caracteres hexadecimales)
        if (id.length !== 24 || !/^[a-fA-F0-9]{24}$/.test(id)) {
            console.log("ID no válido");
            return new Response('ID no válido: debe ser un ObjectId de 24 caracteres hexadecimales', { status: 400 });
        }

        // Convertir el ID en un ObjectId de MongoDB
        let objectId;
        try {
            objectId = new ObjectId(id); // Conversión correcta de ID
        } catch (error) {
            console.error('Error al convertir el ID a ObjectId:', error);
            return new Response('ID no válido: Error al convertir el ID a ObjectId', { status: 400 });
        }

        // Buscar el usuario por ObjectId
        const user = await User.findById(objectId);
        if (!user) {
            console.log("Usuario NO encontrado");
            return new Response('Usuario NO encontrado', { status: 404 });
        }

        // Eliminar el usuario por _id
        await User.deleteOne({ _id: objectId });
        return NextResponse.json({ message: 'Usuario ELIMINADO correctamente' }, { status: 200 });

    } catch (error) {
        console.log('Error al eliminar usuario:', error);
        return new Response('Error al eliminar el usuario', { status: 500 });
    }
}