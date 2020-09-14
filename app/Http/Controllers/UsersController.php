<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// Models
use App\Models\User;
use App\Models\Phone;

class UsersController extends Controller
{
    /**
     * Esta funcion sirve para obtener todos los usuarios registrados en la base de datos.
     * @return array con los usuarios obtenidos.
     */

    public function getUsers()
    {
        $users = User::with(['phones']);
        return [
            'count' => 10,
            'data' => $users->get()->toArray(),
            'total' => $users->count()
        ];
    }
    
    /**
     * Esta funcion sirve para editar los datos del usuario.
     * @param string $request->name, con el nombre del usuario.
     * @param string $request->last_name, con el apellido del usuario.
     * @param integer $request->document, con el numero de documento del usuario.
     * @param integer $request->phone, con el numero de usuario del usuario.
     * @param string $request->email, con el email del usuario.
     * @return array con la respuesta formateada de la solucion de la peticion.
     */
    public function editUser(Request $request)
    {
        $status = false;
        $result = null;
        DB::beginTransaction();
        try {
            $preUser = User::where('id', $request->id)->where('email', $request->email)->where('document', $request->document)->exists();
            if(!$preUser){
                $email = User::where('email', $request->email)->exists();
                if($email){
                    return $this->Response(false, ['type' => 'error', 'content' => 'Ya existe un usuario con el mismo correo ingresado'], $result);
                }

                $document = User::where('document', $request->document)->exists();
                if($document){
                    return $this->Response(false, ['type' => 'error', 'content' => 'Ya existe un usuario con el mismo n° de documento ingresado'], $result);
                }
            }
            

            $user = User::find($request->id);
            $user->name = $request->name;
            $user->last_name = $request->last_name;
            $user->document = $request->document;
            $user->email = $request->email;
            $user->save();

            $phone = Phone::where('user_id', $user->id)->where('principal', $this->principal_phone)->update(['phone' => $request->phone]);

            $status = true;
            DB::commit();
        } catch (\Throwable $th) {
            $result = $th->getMessage();
            DB::rollBack();
        }if($status){
            return $this->Response(true, ['type' => 'success', 'content' => 'Hecho'], []);
        }else{
            return $this->Response(false, ['type' => 'error', 'content' => 'Error'], $result);
        }
    }

    public function createUser(Request $request){
        $status = false;
        $result = null;
        DB::beginTransaction();
        try {
            
            $email = User::where('email', $request->email)->exists();
            if($email){
                return $this->Response(false, ['type' => 'error', 'content' => 'Ya existe un usuario con el mismo correo ingresado'], $result);
            }

            $document = User::where('document', $request->document)->exists();
            if($document){
                return $this->Response(false, ['type' => 'error', 'content' => 'Ya existe un usuario con el mismo # de documento ingresado'], $result);
            }
            
            $user = new User();
            $user->name = $request->name;
            $user->last_name = $request->last_name;
            $user->document = $request->document;
            $user->email = $request->email;
            $user->verification_code = 0;
            $user->save();

            $phone = new Phone();
            $phone->user_id = $user->id;
            $phone->phone = $request->phone;
            $phone->principal = $this->principal_phone;
            $phone->save();

            $status = true;
            DB::commit();
        } catch (\Throwable $th) {
            $result = $th->getMessage();
            DB::rollBack();
        }if($status){
            return $this->Response(true, ['type' => 'success', 'content' => 'Hecho'], []);
        }else{
            return $this->Response(false, ['type' => 'error', 'content' => 'Error'], $result);
        }
    }

    public function deleteUser($id)
    {
        $status = false;
        $result = null;
        DB::beginTransaction();
        try {
            User::where('id', $id)->delete();

            $status = true;
            DB::commit();
        } catch (\Throwable $th) {
            $result = $th->getMessage();
            DB::rollBack();
        }if($status){
            return $this->Response(true, ['type' => 'success', 'content' => 'Hecho'], []);
        }else{
            return $this->Response(false, ['type' => 'error', 'content' => 'Error'], $result);
        }
    }
}
