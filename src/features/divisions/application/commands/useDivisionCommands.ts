import { useState } from "react";
import { createDivision, deleteDivision, updateDivision } from "../../infrastructure/divisions.api";

export function useDivisionCommands() {
  const [loading, setLoading] = useState(false);

  async function create(payload: { name: string; parent_id?: number | null; ambassadors?: string | null }) {
    setLoading(true);
    try {
      return await createDivision(payload);
    } finally {
      setLoading(false);
    }
  }

  async function update(id: number, payload: { name?: string; parent_id?: number | null; ambassadors?: string | null }) {
    setLoading(true);
    try {
      return await updateDivision(id, payload);
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: number) {
    setLoading(true);
    try {
      await deleteDivision(id);
    } finally {
      setLoading(false);
    }
  }

  return { loading, create, update, remove };
}