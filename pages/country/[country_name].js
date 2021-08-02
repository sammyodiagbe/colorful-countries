import country from "../../styles/Country.module.css";
import { useRouter } from "next/router";

export default function Country() {
  const router = useRouter();
  const { country_name } = router.query;
  return <div className={country.container}>country {country_name}</div>;
}
