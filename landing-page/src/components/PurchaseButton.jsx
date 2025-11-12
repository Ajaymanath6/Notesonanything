import CandyButton from './CandyButton'

const PurchaseButton = ({ onClick, title = "Upgrade to unlock unlimited notes", children = "Get Unlimited Notes" }) => {
  return (
    <CandyButton
      onClick={onClick}
      title={title}
    >
      {children}
    </CandyButton>
  )
}

export default PurchaseButton

