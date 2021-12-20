import { Region } from "./region";

export class Cliente {
 id!: number;
 nombre!: string;
 apellido!:string;
 createdAt!: string;
 email!: string;
 imagen!: string;
 region!: Region;
}
