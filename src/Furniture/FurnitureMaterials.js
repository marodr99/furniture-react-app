const FurnitureMaterials = ({materials}) => {
    return materials.map(material => <option key={material} value={material}>{material}</option>);
}

export default FurnitureMaterials;