<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

// Models
use App\Models\User;
use App\Models\Phone;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'Anyi',
            'last_name' => 'Lozano',
            'document' => 1106397965,
            'email' => 'arelozano210914@gmail.com',
            'password' => Hash::make('password'),
            'verification_code' => 0
        ]);
        
        Phone::create([
            'user_id' => $user->id,
            'phone' => 3232034689,
            'principal' => 1
        ]);
    }
}
