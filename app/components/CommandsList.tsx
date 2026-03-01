
type ComandsListProps = {
  title: string, 
  command: string[], 
  commandStatus: string,
}

export function CommandsList ({ title, command, commandStatus }:ComandsListProps ) {
  return (
    <div className="content bg-secondary">
      <h3>Pagamento a realizar</h3>
      <h3>{title}</h3>
      <p>{command}</p>
    </div>
  )
}
// commandStatus, onCommandUpdate