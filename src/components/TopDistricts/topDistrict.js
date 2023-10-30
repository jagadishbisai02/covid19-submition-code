import './topDistrict.css'

const TopDistricts = props => {
  const {topDistrictsNumber, topDistrictsName} = props

  return (
    <li className="top-districts">
      <p className="top-district-number">{topDistrictsNumber}</p>
      <p className="top-district-name">{topDistrictsName}</p>
    </li>
  )
}
export default TopDistricts
