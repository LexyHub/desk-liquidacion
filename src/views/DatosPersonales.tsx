import { Card } from "@components/ui/Card";
import { ContentHead } from "@/components/ui/ContentHead";
import { Table } from "@components/ui/Table";
import { Select } from "@/components/form/Select";
import { useState } from "react";
import { SearchableSelect } from "@/components/form/SearchableSelect";
import { Input } from "@/components/form/Input";

export default function DatosPersonales() {
  const [testValue, setTestValue] = useState<string>("");
  const [testValue2, setTestValue2] = useState<number>(0);

  return (
    <main className='animate-fade-in animate-duration-200'>
      <ContentHead />
      <section className='p-4'>
        <Card>
          <Card.Header>
            <Card.Title>Identificación</Card.Title>
          </Card.Header>
          <Card.Content>
            <Table>
              <Table.Row
                rowkey='nombre'
                label='Nombre completo'
                isStared={true}
                onStarToggle={(k) => console.log(k)}
                stareable>
                <Select
                  options={{ ariel: "Ariel Silva", nico: "Nicolás Guzmán" }}
                  value={testValue}
                  onValueChange={(v) => setTestValue(v)}
                />
              </Table.Row>
              <Table.Row
                rowkey='nombre'
                label='Nombre completo'
                isStared={true}
                onStarToggle={(k) => console.log(k)}
                stareable>
                <SearchableSelect
                  options={[
                    { label: "Ariel Silva", value: "ariel" },
                    { label: "Nicolás Guzmán", value: "nico" },
                  ]}
                  value={testValue}
                  onValueChange={(v) => setTestValue(v)}
                />
              </Table.Row>
              <Table.Row
                rowkey='nombre'
                label='Nombre completo'
                isStared={true}
                onStarToggle={(k) => console.log(k)}
                stareable>
                <Input
                  type='number'
                  value={String(testValue2)}
                  onChange={(v) => setTestValue2(v as number)}
                />
              </Table.Row>
            </Table>
          </Card.Content>
        </Card>
      </section>
    </main>
  );
}
