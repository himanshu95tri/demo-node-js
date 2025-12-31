import { Request, Response, NextFunction } from 'express';
import { db } from '../../models';

export const checkPermission = (apiName: string) => {
  return async (req: any, res: Response, next: NextFunction) => {

    if (!req.user || !req.user.id) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated.' });
      return;
    }

    const user = await db.users.findByPk(req.user.id);

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    if (!user.membershipId) {
      res.status(403).json({ message: 'Forbidden: No active membership found for this user.' });
      return;
    }

    const membership = await db.memberships.findByPk(user.membershipId);

    if (!membership) {
      res.status(403).json({ message: 'Forbidden: Membership details not found.' });
      return;
    }

    const allowedApis = membership.allowedApis || [];

    if (!allowedApis.includes(apiName)) {
      res.status(403).json({ message: `Forbidden: Your current membership does not grant access to ${apiName}.` });
      return;
    }

    next();
  };
};
