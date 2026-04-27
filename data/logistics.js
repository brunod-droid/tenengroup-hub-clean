const data = [
  {
    "id": "factories",
    "name": "Factories and production",
    "type": "Logistics",
    "short": "Production location and timing affect ETA.",
    "full": [
      "Factories in Israel, Thailand and Hungary.",
      "Israel includes Kiryat Gat and Nazareth.",
      "Each product has own production time.",
      "Factories do not all work same days: Israel does not work Saturday; Thailand does not work Sunday."
    ]
  },
  {
    "id": "shipping",
    "name": "Shipping logic",
    "type": "Logistics",
    "short": "ETA depends on product, factory, destination and carrier.",
    "full": [
      "Shipping method can improve transit speed but not production speed.",
      "Carrier checks are needed for trackable shipments.",
      "AfterShip and 17Track support tracking investigation."
    ]
  }
];
export default data;
