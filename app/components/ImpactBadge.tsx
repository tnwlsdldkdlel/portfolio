interface ImpactBadgeProps {
  label: string;
  value: string;
  improvement: string;
}

export default function ImpactBadge({ label, value, improvement }: ImpactBadgeProps) {
  return (
    <div className="border border-black p-4 invert-on-hover">
      <div className="text-sm font-medium mb-1">{label}</div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-sm">{improvement}</div>
    </div>
  );
}

