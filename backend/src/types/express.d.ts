import "express";
// pour le typqge lorsque je viens récupère le userId depuis mon Token et que je l'ajoute dans la req.
declare module "express" {
  export interface Request {
    userId?: string;
  }
}
