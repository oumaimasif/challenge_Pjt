import React from 'react';

const ContactAss = ({ association }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Informations de Contact</h2>
      <div className="space-y-3">
        <div>
          <span className="font-semibold">Adresse:</span>
          <p>{association.adresse || "Non renseignée"}</p>
        </div>
        <div>
          <span className="font-semibold">Téléphone:</span>
          <p>{association.telephone || "Non renseigné"}</p>
        </div>
        <div>
          <span className="font-semibold">Email:</span>
          <p>{association.email || "Non renseigné"}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactAss