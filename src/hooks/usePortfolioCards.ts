import { useEffect, useState } from "react";
import { type Candidate } from "../data/site";
import { getCandidateCards, subscribeToPortfolioUpdates } from "../lib/portfolioStore";

export function usePortfolioCards() {
  const [cards, setCards] = useState<Candidate[]>(() => getCandidateCards());

  useEffect(() => {
    setCards(getCandidateCards());

    return subscribeToPortfolioUpdates(() => {
      setCards(getCandidateCards());
    });
  }, []);

  return cards;
}
