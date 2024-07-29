import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Deleticons from './assets/icons';

const schemaOptions = [
    { label: 'First Name', value: 'first_name', type: 'user' },
    { label: 'Last Name', value: 'last_name', type: 'user' },
    { label: 'Gender', value: 'gender', type: 'user' },
    { label: 'Age', value: 'age', type: 'user' },
    { label: 'Account Name', value: 'account_name', type: 'group' },
    { label: 'City', value: 'city', type: 'group' },
    { label: 'State', value: 'state', type: 'group' },
];

function SegmentCreator() {
    const [isOpen, setIsOpen] = useState(false);
    const [segmentName, setSegmentName] = useState('');
    const [selectedSchemas, setSelectedSchemas] = useState([]);
    const [currentSchema, setCurrentSchema] = useState('');


    const handleSaveSegment = () => {
        setIsOpen(true);
    };

    const handleAddNewSchema = () => {
        if (currentSchema) {
            setSelectedSchemas([...selectedSchemas, currentSchema]);
            setCurrentSchema('');
        }
    };

    const handleRemoveSchema = (index) => {
        const newSelectedSchemas = [...selectedSchemas];
        newSelectedSchemas.splice(index, 1);
        setSelectedSchemas(newSelectedSchemas);
    };

    const handleSave = () => {
        const data = {
            segment_name: segmentName,
            schema: selectedSchemas.map(schema => {
                const { label, value } = schemaOptions.find(option => option.value === schema);
                return { [value]: label };
            }),
        };
        console.log('Sending data to server:', data);
        // Here you would typically send the data to your server
        setIsOpen(false);
        setSegmentName('');
        setSelectedSchemas([]);
    };

    const availableOptions = schemaOptions.filter(option => !selectedSchemas.includes(option.value));

    const buttonflash = `relative flex h-[50px] w-40 items-center justify-center overflow-hidden bg-gray-800 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-cyan-500 before:duration-500 before:ease-out hover:shadow-cyan-500 hover:before:h-56 hover:before:w-56`
    const buttonText = `relative z-10`
    return (
        <>
            <div className="flex">
                <div className="w-screen h-screen p-4 bg-gray-100">
                    <div className="mb-4 text-lg font-semibold bg-cyan-500 text-white p-4">← View Audience</div>
                    <Button onClick={handleSaveSegment} variant="outline" className={buttonflash}><span className={buttonText}>Save segment</span></Button>
                </div>
                {isOpen && (
                    <div className="w-1/2 p-4 bg-white">
                        <div className="mb-4 text-lg font-semibold bg-cyan-500 text-white p-4">← Saving Segment</div>
                        <div className="space-y-4">
                            <Input
                                placeholder="Enter the Name of the Segment"
                                value={segmentName}
                                onChange={(e) => setSegmentName(e.target.value)}
                            />
                            <p className="text-sm text-gray-600">To save your segment, you need to add the schemas to build the query</p>
                            <div className="flex space-x-4 mb-2">
                                <div className="flex items-center">
                                    <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                                    <span className="text-sm">User Traits</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span>
                                    <span className="text-sm">Group Traits</span>
                                </div>
                            </div>
                            <div className="bg-blue-100 p-4 rounded">
                                {selectedSchemas.map((schema, index) => {
                                    const schemaOption = schemaOptions.find(option => option.value === schema);
                                    return (
                                        <div key={index} className="flex items-center space-x-2 mb-2">
                                            <span className={`w-3 h-3 ${schemaOption.type === 'user' ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></span>
                                            <Select value={schema} onValueChange={(value) => {
                                                const newSelectedSchemas = [...selectedSchemas];
                                                newSelectedSchemas[index] = value;
                                                setSelectedSchemas(newSelectedSchemas);
                                            }}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue>{schemaOption.label}</SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {schemaOptions.filter(option => !selectedSchemas.includes(option.value) || option.value === schema).map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Button variant="ghost" onClick={() => handleRemoveSchema(index)}><Deleticons /></Button>
                                        </div>
                                    );
                                })}
                            </div>
                            <Select value={currentSchema} onValueChange={setCurrentSchema}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Add schema to segment" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button variant="link" className="text-teal-600" onClick={handleAddNewSchema}>+ Add new schema</Button>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <Button onClick={handleSave} className="bg-teal-500 hover:bg-teal-600 text-white">Save the Segment</Button>
                            <Button variant="outline" onClick={() => setIsOpen(false)} className="text-red-500 border-red-500">Cancel</Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SegmentCreator;
