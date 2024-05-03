import { User } from "../models/User";

const isAdminOrOwner = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const currentUser = await User.findById(req.user.id);
  
      if (!currentUser) {
        return res.status(401).send("Utilisateur non authentifié.");
      }
  
      if (currentUser.isAdmin || currentUser.id === userId) {
        return next();
      } else {
        return res.status(403).send("Accès non autorisé. Vous devez être administrateur ou propriétaire de la ressource.");
      }
    } catch (error) {
      // Gérer les erreurs
      next(error);
    }
  };
  